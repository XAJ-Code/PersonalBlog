# C# P/Invoke 学习笔记

## 1. P/Invoke 基础概念

### 1.1 什么是 P/Invoke？
**平台调用服务**（Platform Invocation Services）允许托管代码（C#）调用非托管函数（如 Windows API、C/C++ DLL）。

### 1.2 核心作用
- 调用 Windows API（user32.dll、kernel32.dll 等）
- 使用第三方非托管 DLL
- 与系统底层功能交互

## 2. 基本语法结构

### 2.1 基本声明
```csharp
using System.Runtime.InteropServices;

[DllImport("user32.dll", CharSet = CharSet.Unicode)]
public static extern int MessageBox(IntPtr hWnd, string text, string caption, uint type);
```

### 2.2 DllImport 属性参数
| 参数 | 说明 | 示例 |
|------|------|------|
| `DllName` | 目标 DLL 名称 | `"user32.dll"` |
| `CharSet` | 字符串编码 | `CharSet.Unicode` |
| `EntryPoint` | 函数入口点 | `"MessageBoxW"` |
| `SetLastError` | 是否设置错误码 | `true` |
| `CallingConvention` | 调用约定 | `CallingConvention.StdCall` |

## 3. 数据类型映射

### 3.1 基本类型映射
| Win32 类型 | C# 类型 | 说明 |
|-----------|---------|------|
| `HWND`, `HANDLE` | `IntPtr` | 句柄/指针 |
| `DWORD` | `uint` | 32位无符号整数 |
| `BOOL` | `bool` | 布尔值（实际为4字节） |
| `LPCSTR` | `string` + `CharSet.Ansi` | ANSI 字符串 |
| `LPCWSTR` | `string` + `CharSet.Unicode` | Unicode 字符串 |
| `BYTE` | `byte` | 字节 |
| `INT` | `int` | 32位整数 |

### 3.2 特殊类型处理
```csharp
// 结构体需要指定布局
[StructLayout(LayoutKind.Sequential)]
public struct RECT {
    public int left;
    public int top;
    public int right;
    public int bottom;
}

// 回调函数
public delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);
```

## 4. 常用 Windows API 示例

### 4.1 用户界面相关（user32.dll）
```csharp
// MessageBox 示例
[DllImport("user32.dll", CharSet = CharSet.Unicode)]
public static extern int MessageBox(IntPtr hWnd, string text, string caption, uint type);

// 常用样式常量
public const uint MB_OK = 0x00000000;
public const uint MB_OKCANCEL = 0x00000001;
public const uint MB_YESNO = 0x00000004;
public const uint MB_ICONWARNING = 0x00000030;

// 使用示例
int result = MessageBox(IntPtr.Zero, "确认删除？", "警告", MB_YESNO | MB_ICONWARNING);
```

### 4.2 窗口管理
```csharp
[DllImport("user32.dll")]
static extern bool SetWindowText(IntPtr hWnd, string text);

[DllImport("user32.dll")]
static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);

[DllImport("user32.dll")]
static extern IntPtr FindWindow(string lpClassName, string lpWindowName);
```

### 4.3 文件系统（kernel32.dll）
```csharp
[DllImport("kernel32.dll", CharSet = CharSet.Unicode)]
static extern IntPtr CreateFile(
    string lpFileName,
    uint dwDesiredAccess,
    uint dwShareMode,
    IntPtr lpSecurityAttributes,
    uint dwCreationDisposition,
    uint dwFlagsAndAttributes,
    IntPtr hTemplateFile
);

[DllImport("kernel32.dll")]
static extern bool CloseHandle(IntPtr hObject);
```

### 4.4 系统信息
```csharp
[DllImport("kernel32.dll")]
static extern void GetSystemInfo(out SYSTEM_INFO lpSystemInfo);

[StructLayout(LayoutKind.Sequential)]
public struct SYSTEM_INFO {
    public ushort wProcessorArchitecture;
    public uint dwPageSize;
    public IntPtr lpMinimumApplicationAddress;
    public IntPtr lpMaximumApplicationAddress;
    public IntPtr dwActiveProcessorMask;
    public uint dwNumberOfProcessors;
    public uint dwProcessorType;
    public uint dwAllocationGranularity;
    public ushort wProcessorLevel;
    public ushort wProcessorRevision;
}
```

## 5. 错误处理和最佳实践

### 5.1 错误处理
```csharp
[DllImport("kernel32.dll", SetLastError = true)]
static extern bool SomeFunction();

public static void CallWithErrorHandling()
{
    if (!SomeFunction())
    {
        int errorCode = Marshal.GetLastWin32Error();
        throw new System.ComponentModel.Win32Exception(errorCode);
    }
}
```

### 5.2 内存管理注意事项
```csharp
// 需要手动释放的内存
[DllImport("kernel32.dll", SetLastError = true)]
static extern IntPtr VirtualAlloc(
    IntPtr lpAddress,
    uint dwSize,
    uint flAllocationType,
    uint flProtect);

[DllImport("kernel32.dll", SetLastError = true)]
static extern bool VirtualFree(IntPtr lpAddress, uint dwSize, uint dwFreeType);
```

## 6. 与直接引用 DLL 的区别

| 特性 | P/Invoke | 直接引用 DLL |
|------|----------|--------------|
| **目标类型** | 非托管 DLL（C/C++） | 托管 DLL（.NET） |
| **调用方式** | `DllImport` + 声明 | `using` + 直接调用 |
| **性能** | 较慢（跨边界调用） | 较快（纯托管） |
| **适用场景** | Windows API、系统功能 | .NET 类库、NuGet 包 |

## 7. 学习资源和工具

### 7.1 官方文档
- **https://learn.microsoft.com/en-us/windows/win32/api/**
- **Windows SDK 头文件**：`winuser.h`, `winbase.h` 等

### 7.2 实用工具
- **https://www.pinvoke.net/**：P/Invoke 签名数据库
- **Dependency Walker**：查看 DLL 导出函数
- **Spy++**：窗口分析工具

### 7.3 常用头文件位置
```
32位系统/64位系统64位应用：C:\Windows\System32\
64位系统32位应用：C:\Windows\SysWOW64\
```

## 8. 实际应用示例

### 8.1 完整示例：系统信息获取
```csharp
using System;
using System.Runtime.InteropServices;

class SystemInfoDemo
{
    [DllImport("kernel32.dll")]
    static extern void GetSystemInfo(out SYSTEM_INFO lpSystemInfo);
    
    [DllImport("kernel32.dll")]
    static extern void GetNativeSystemInfo(out SYSTEM_INFO lpSystemInfo);

    public static void ShowSystemInfo()
    {
        SYSTEM_INFO info;
        GetSystemInfo(out info);
        
        Console.WriteLine($"处理器架构: {info.wProcessorArchitecture}");
        Console.WriteLine($"处理器数量: {info.dwNumberOfProcessors}");
        Console.WriteLine($"页大小: {info.dwPageSize}");
    }
}
```

### 8.2 窗口枚举示例
```csharp
[DllImport("user32.dll")]
static extern bool EnumWindows(EnumWindowsProc enumProc, IntPtr lParam);

public delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);

[DllImport("user32.dll", CharSet = CharSet.Unicode)]
static extern int GetWindowText(IntPtr hWnd, StringBuilder lpString, int nMaxCount);

public static void ListAllWindows()
{
    EnumWindows((hWnd, lParam) => {
        var sb = new StringBuilder(256);
        GetWindowText(hWnd, sb, sb.Capacity);
        if (sb.Length > 0)
            Console.WriteLine(sb.ToString());
        return true;
    }, IntPtr.Zero);
}
```

## 9. 注意事项和陷阱

### 9.1 常见问题
1. **字符集不匹配**：确保 `CharSet` 与目标函数一致
2. **32/64 位兼容性**：注意指针大小差异
3. **DLL 搜索路径**：系统 DLL 不要复制到项目目录
4. **内存管理**：非托管内存需要手动释放

### 9.2 调试技巧
```csharp
// 使用 try-catch 包装 P/Invoke 调用
try 
{
    int result = MessageBox(...);
}
catch (DllNotFoundException ex)
{
    Console.WriteLine($"DLL 未找到: {ex.Message}");
}
catch (EntryPointNotFoundException ex)
{
    Console.WriteLine($"函数入口点未找到: {ex.Message}");
}
```

---

**总结**：P/Invoke 是 C# 与原生代码交互的强大工具，掌握它可以极大地扩展 .NET 应用的能力。关键是要理解数据类型映射、内存管理和错误处理机制。