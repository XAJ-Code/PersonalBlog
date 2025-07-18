# Android 屏幕适配核心：深入理解 dp 单位

![Android屏幕密度示意图](https://developer.android.com/static/images/screens_support/screens-densities.png)

## 一、什么是 dp 单位？

**dp（Density-independent Pixels）** 是 Android 系统特有的尺寸单位，中文译为"密度无关像素"。它的核心设计目的是解决不同屏幕密度下的界面显示一致性问题。

### 关键特性：
- 基于屏幕物理密度的相对单位
- 系统自动完成不同设备上的尺寸换算
- 确保 UI 元素在不同设备上物理尺寸近似相同
- dp:密度无关像素,计算公式：px = dp × (dpi / 160)，其中dpi为屏幕像素密度，160dpi为基准值
- sp:缩放无关像素在dp基础上增加了对**用户字体大小**偏好的适配,计算公式：px = sp × (dpi / 160) × scale，scale为用户设置的字体缩放因子（默认1.0）

## 二、为什么需要 dp？

### 屏幕密度碎片化现状
| 密度类型 | dpi 范围 | 像素比例 | 代表设备 |
|---------|---------|---------|---------|
| ldpi    | ~120dpi | 0.75x   | 早期低端机 |
| mdpi    | ~160dpi | 1x      | 基准密度 |
| hdpi    | ~240dpi | 1.5x    | 中端机型 |
| xhdpi   | ~320dpi | 2x      | 主流旗舰 |
| xxhdpi  | ~480dpi | 3x      | 高端机型 |
| xxxhdpi | ~640dpi | 4x      | 超清设备 |

没有 dp 单位会导致：
- 同一 100px 的按钮在 xxhdpi 设备上看起来只有 mdpi 设备的三分之一大小
- UI 元素物理尺寸不一致
- 布局错乱风险增加

## 三、dp 的换算原理

### 核心公式：
```
px = dp × (dpi / 160)
```

换算示例：
```java
// 在 320dpi（xhdpi）设备上：
100dp = 100 × (320/160) = 200px

// 在 480dpi（xxhdpi）设备上：
100dp = 100 × (480/160) = 300px
```

### 系统提供的转换方法：
```kotlin
// Kotlin 扩展函数方式
fun Int.dpToPx(context: Context): Int =
    (this * context.resources.displayMetrics.density).toInt()

fun Int.pxToDp(context: Context): Int =
    (this / context.resources.displayMetrics.density).toInt()
```

## 四、dp 与其他单位的对比

| 单位 | 全称 | 特性 | 推荐使用场景 |
|------|------|-----|------------|
| dp   | Density-independent Pixels | 密度无关 | 布局尺寸、边距 |
| sp   | Scale-independent Pixels | 可缩放 | 文字大小 |
| px   | Pixels | 绝对像素 | 极特殊情况 |
| in   | Inches | 物理英寸 | 打印相关 |
| mm   | Millimeters | 物理毫米 | 打印相关 |

**特别说明**：
- 文字尺寸务必使用 sp，因为它会尊重用户的系统字体大小设置
- 1dp 细线问题：在超高密度屏上可能显示过细，可用 0.5dp

## 五、实际开发最佳实践

### 1. XML 布局规范
```xml
<!-- 正确定义 -->
<Button
    android:layout_width="100dp"
    android:layout_height="40dp"
    android:textSize="14sp"/>

<!-- 错误示范 --> 
<Button
    android:layout_width="100px"  <!-- 避免使用px -->
    android:layout_height="40px"/>
```

### 2. 多密度图片处理
```
res/
   drawable-mdpi/icon.png    // 48×48px
   drawable-hdpi/icon.png    // 72×72px (1.5x)
   drawable-xhdpi/icon.png   // 96×96px (2x)
   drawable-xxhdpi/icon.png  // 144×144px (3x)
```

### 3. 现代适配方案组合
- **ConstraintLayout** + dp：实现灵活布局
- **Jetpack Compose**：内置 dp 支持更智能
- 尺寸限定符：`values-sw600dp` 适配平板

## 六、常见问题解答

**Q：为什么我的 1dp 边框在某些设备上不显示？**
A：超高密度设备上 1dp 可能小于 1px 物理像素，尝试使用 0.5dp 或 View 的 strokeWidth

**Q：设计师给的 px 标注稿如何转换？**
A：按基准密度 160dpi 换算：
```
dp = px / (目标设备dpi / 160)
或直接使用 px / 设计稿标注的倍率
```

**Q：平板适配有什么特别注意事项？**
A：建议：
1. 使用 `smallestWidth` 限定符（如 values-sw600dp）
2. 采用分栏布局
3. 增加 dp 值的阶梯变化

## 七、延伸阅读
- https://developer.android.com/guide/practices/screens_support
- https://material.io/design/layout/understanding-layout.html
- https://developer.android.com/jetpack/compose/layouts

> "dp 不是万能的，但没有 dp 是万万不能的" —— Android 开发者箴言