# 工业线扫相机核心概念与调试指南

## 1. 核心概念解析

### 1.1 线扫相机工作原理
- **成像方式**：通过逐行扫描的方式捕获图像，每次触发采集一行像素。
- **与面阵相机的区别**：面阵相机一次曝光捕获一整幅二维图像，而线扫相机需要多次触发并拼接行数据来形成二维图像。

### 1.2 关键性能指标

#### 行频（Line Rate）
- **定义**：相机每秒能够采集的图像行数，单位Hz或kHz。
- **计算公式**：`行频 = 1 / 行周期`
- **性能影响**：直接决定系统检测速度的上限。

#### 曝光时间（Exposure Time）
- **定义**：传感器每个像素感光的时间长度，单位µs或ms。
- **三重影响**：
  1. **图像亮度**：曝光时间越长，图像越亮
  2. **运动模糊**：`模糊像素数 = (物体速度 × 曝光时间) / 像元尺寸`
  3. **行频上限**：`最大行频 ≤ 1 / 曝光时间`

#### 帧率（Frame Rate）
- **线扫相机特性**：帧率是派生参数，而非直接设置项。
- **计算公式**：`帧率(FPS) = 行频(Hz) / 图像高度(行数)`

## 2. 重要参数设置

### 2.1 分辨率参数说明
```csharp
tSdkImageResolution resolution;
resolution.iWidth = 8192;      // 输出图像宽度
resolution.iWidthFOV = 8192;   // 实际采集视场宽度
resolution.iHeight = 64;       // 输出图像高度（行数）
resolution.iHeightFOV = 64;    // 采集视场高度
```

**关键区别**：
- `iWidth/iHeight`：控制输出图像的尺寸（软件层）
- `iWidthFOV/iHeightFOV`：控制实际采集的物理范围（硬件层）

### 2.2 触发模式（Trigger Mode）
```csharp
// 0=连续采集，1=软触发，2=硬触发
MvApi.CameraSetTriggerMode(_mHCamera, 1);
```

## 3. 实战代码示例

### 3.1 相机初始化与配置
```csharp
public void InitializeCamera()
{
    // 枚举相机设备
    tSdkCameraDevInfo[] devList;
    MvApi.CameraEnumerateDevice(out devList);
    
    // 初始化相机
    MvApi.CameraInit(ref devList[0], -1, -1, ref _mHCamera);
    
    // 设置分辨率
    tSdkImageResolution resolution;
    MvApi.CameraGetImageResolution(_mHCamera, out resolution);
    resolution.iIndex = 0xFF;
    resolution.iWidth = 8192;
    resolution.iHeight = 64;
    MvApi.CameraSetImageResolution(_mHCamera, ref resolution);
    
    // 设置触发模式
    MvApi.CameraSetTriggerMode(_mHCamera, 1); // 软触发
    
    // 设置曝光时间（典型值1-10ms）
    MvApi.CameraSetExposureTime(_mHCamera, 5.0);
    
    // 注册回调函数
    CAMERA_SNAP_PROC callback = ImageCaptureCallback;
    MvApi.CameraSetCallbackFunction(_mHCamera, callback, 0, ref _oldCallback);
    
    // 开始采集
    MvApi.CameraPlay(_mHCamera);
}
```

### 3.2 图像采集回调函数
```csharp
private void ImageCaptureCallback(CameraHandle hCamera, IntPtr rawBuffer, 
                                  ref tSdkFrameHead frameHead, IntPtr pContext)
{
    // 检查图像参数
    Console.WriteLine($"收到图像: {frameHead.iWidth} × {frameHead.iHeight}");
    
    // 处理图像数据
    byte[] imageData = new byte[frameHead.iWidth * frameHead.iHeight];
    Marshal.Copy(rawBuffer, imageData, 0, imageData.Length);
    
    // 保存或处理图像
    ProcessImage(imageData, frameHead.iWidth, frameHead.iHeight);
}
```

### 3.3 软触发采集循环
```csharp
public void CaptureFrames(int lineCount)
{
    for (int i = 0; i < lineCount; i++)
    {
        MvApi.CameraSoftTrigger(_mHCamera);
        Thread.Sleep(10); // 根据行频调整间隔
    }
}
```

## 4. 性能优化策略

### 4.1 曝光时间优化公式
```csharp
double CalculateOptimalExposure(double objectSpeed, double pixelSize, double maxBlur = 1.0)
{
    // 根据允许模糊量计算最大曝光时间
    return (maxBlur * pixelSize) / objectSpeed * 1000; // 返回ms单位
}

// 使用示例：布速1000mm/s，像元7µm，允许0.5像素模糊
double exposure = CalculateOptimalExposure(1000, 0.007, 0.5); // ≈3.5ms
```

### 4.2 行频与吞吐量优化
```csharp
// 计算理论最大行频
double maxLineRate = 1.0 / (exposureTime / 1000); // exposureTime单位为ms

// 验证相机支持的行频范围
double minRate, maxRate;
MvApi.CameraGetLineRateRange(_mHCamera, out minRate, out maxRate);

// 设置最优行频
double targetRate = Math.Min(maxLineRate, maxRate);
MvApi.CameraSetLineRate(_mHCamera, targetRate);
```

## 5. 常见问题与解决方案

### 5.1 图像采集问题排查

| 问题现象 | 可能原因 | 解决方案 |
|---------|----------|----------|
| 采集时间过长 | 曝光时间设置过大 | 重新计算合理曝光时间 |
| 图像模糊 | 运动模糊严重 | 缩短曝光时间或降低物体速度 |
| 回调不触发 | 触发模式配置错误 | 检查CameraSetTriggerMode设置 |
| 内存访问错误 | 缓冲区未正确分配 | 验证_mIamgeBuffer分配大小 |

### 5.2 性能瓶颈分析
```csharp
// 性能测试代码
Stopwatch sw = new Stopwatch();
sw.Start();

// 执行采集操作
CaptureFrames(64);

sw.Stop();
Console.WriteLine($"采集64行耗时: {sw.ElapsedMilliseconds}ms");

// 计算实际行频
double actualLineRate = 64.0 / (sw.ElapsedMilliseconds / 1000.0);
Console.WriteLine($"实际行频: {actualLineRate}Hz");
```

## 6. 高级调试技巧

### 6.1 实时参数监控
```csharp
// 监控相机状态
double currentExposure;
MvApi.CameraGetExposureTime(_mHCamera, ref currentExposure);

double currentLineRate;
MvApi.CameraGetLineRate(_mHCamera, out currentLineRate);

Console.WriteLine($"当前曝光: {currentExposure}ms, 行频: {currentLineRate}Hz");
```

### 6.2 自动参数调整
```csharp
public void AutoTuneParameters()
{
    // 基于图像亮度自动调整曝光
    double currentBrightness = CalculateImageBrightness();
    double targetBrightness = 120; // 目标灰度值
    
    if (currentBrightness < targetBrightness - 10)
    {
        // 图像太暗，增加曝光
        double newExposure = currentExposure * 1.2;
        MvApi.CameraSetExposureTime(_mHCamera, newExposure);
    }
    else if (currentBrightness > targetBrightness + 10)
    {
        // 图像太亮，减少曝光
        double newExposure = currentExposure * 0.8;
        MvApi.CameraSetExposureTime(_mHCamera, newExposure);
    }
}
```