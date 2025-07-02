# Jetpack Compose 布局系统指南（前端开发者视角）

> 作为前端开发者，学习 Jetpack Compose 时，你会发现很多概念与 HTML/CSS 相似但实现方式不同。本指南将对比 Compose 和 Web 开发的对应概念，帮助你快速理解。

## 一、核心布局组件对比

| Compose 组件 | 功能描述                     | HTML/CSS 近似概念              | 关键区别                     |
|--------------|------------------------------|--------------------------------|------------------------------|
| **`Column`** | 垂直排列子元素               | `display: flex; flex-direction: column` | 更简洁的声明式API            |
| **`Row`**    | 水平排列子元素               | `display: flex; flex-direction: row`    | 内置间距处理更简单           |
| **`Box`**    | 层叠排列子元素               | `position: relative` + 绝对定位子元素   | 默认支持内容对齐             |

### 1. Column 示例（垂直布局）
```kotlin
Column(
    modifier = Modifier.fillMaxSize(),
    verticalArrangement = Arrangement.SpaceBetween,
    horizontalAlignment = Alignment.CenterHorizontally
) {
    Text("Header")
    Button(onClick = { /* action */ }) {
        Text("Click Me")
    }
    Text("Footer")
}
```
≈ HTML:
```html
<div style="display: flex; flex-direction: column; 
            justify-content: space-between; 
            align-items: center;
            height: 100vh;">
  <div>Header</div>
  <button>Click Me</button>
  <div>Footer</div>
</div>
```

### 2. Row 示例（水平布局）
```kotlin
Row(
    modifier = Modifier.fillMaxWidth(),
    horizontalArrangement = Arrangement.SpaceEvenly,
    verticalAlignment = Alignment.CenterVertically
) {
    Icon(Icons.Filled.Home, "Home")
    Icon(Icons.Filled.Search, "Search")
    Icon(Icons.Filled.Settings, "Settings")
}
```
≈ HTML:
```html
<div style="display: flex; justify-content: space-evenly; 
            align-items: center; width: 100%;">
  <img src="home.svg" alt="Home">
  <img src="search.svg" alt="Search">
  <img src="settings.svg" alt="Settings">
</div>
```

### 3. Box 示例（层叠布局）
```kotlin
Box(modifier = Modifier.fillMaxSize()) {
    Image(
        painter = painterResource(R.drawable.background),
        contentDescription = "Background",
        modifier = Modifier.fillMaxSize()
    )
    Text(
        "Overlay Text",
        modifier = Modifier
            .align(Alignment.BottomCenter)
            .padding(16.dp)
            .background(Color.Black.copy(alpha = 0.7f))
    )
}
```
≈ HTML:
```html
<div style="position: relative; height: 100vh;">
  <img src="background.jpg" style="width: 100%; height: 100%;">
  <div style="position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%);
              background: rgba(0,0,0,0.7); padding: 16px;">
    Overlay Text
  </div>
</div>
```

## 二、常用尺寸修饰符对比

| Compose 修饰符             | 功能描述                     | CSS 近似属性                 | 重要说明                     |
|----------------------------|------------------------------|------------------------------|------------------------------|
| **`fillMaxWidth()`**       | 填满可用宽度                 | `width: 100%`                | 相当于 CSS 块级元素默认行为  |
| **`fillMaxHeight()`**      | 填满可用高度                 | `height: 100%`               | 需要父容器有明确高度         |
| **`fillMaxSize()`**        | 同时填满宽高                 | `width: 100%; height: 100%`  | 常用作根容器修饰符           |
| **`width(100.dp)`**        | 设置固定宽度                 | `width: 100px`               | 使用 DP 单位而非像素         |
| **`height(100.dp)`**       | 设置固定高度                 | `height: 100px`              | 响应式设计推荐使用弹性方案   |

### 尺寸修饰符使用示例
```kotlin
Box(modifier = Modifier.fillMaxSize()) {
    Column(
        modifier = Modifier
            .fillMaxWidth(0.8f)  // 80% 宽度 ≈ width: 80%
            .height(200.dp)      // 固定高度 ≈ height: 200px
            .align(Alignment.Center)
    ) {
        // 内容
    }
}
```

## 三、权重（Weight）系统详解

### `Modifier.weight()` 对比 CSS Flexbox

| 特性                     | Compose `weight`                      | CSS `flex-grow`                     |
|--------------------------|---------------------------------------|--------------------------------------|
| **基本用法**             | `Modifier.weight(1f)`                 | `flex-grow: 1`                      |
| **空间分配**             | 按比例分配剩余空间                    | 按比例分配剩余空间                   |
| **默认拉伸**             | `fill=true` (默认拉伸填充)            | 取决于 `align-items` 设置            |
| **使用范围**             | 只能在 `Row`/`Column` 的直接子项使用  | 在 Flex 容器内使用                   |
| **固定尺寸组合**         | 不能与固定尺寸同时使用                | 可与固定尺寸组合                     |

### 权重使用示例
```kotlin
Row(modifier = Modifier.fillMaxWidth()) {
    // 类似 flex: 1
    Box(
        modifier = Modifier
            .weight(1f)
            .height(50.dp)
            .background(Color.Red)
    )
    
    // 类似 flex: 2
    Box(
        modifier = Modifier
            .weight(2f)
            .height(50.dp)
            .background(Color.Blue)
    )
}
```

≈ HTML:
```html
<div style="display: flex; width: 100%;">
  <div style="flex: 1; height: 50px; background: red;"></div>
  <div style="flex: 2; height: 50px; background: blue;"></div>
</div>
```

### 重要注意事项：
1. **父容器要求**：
   - 父 `Row`/`Column` 需要有可用空间（推荐设置 `fillMaxWidth` 或 `fillMaxSize`）
   - 类似于 CSS 中 Flex 容器需要有明确尺寸

2. **冲突解决**：
   ```kotlin
   // ✅ 正确用法
   Modifier.weight(1f).height(50.dp)
   
   // ❌ 错误用法（冲突）
   Modifier.weight(1f).fillMaxHeight()
   ```

## 四、组合使用最佳实践

### 常见布局模式
```kotlin
@Composable
fun CommonLayout() {
    // 类似 <div class="container">
    Column(modifier = Modifier.fillMaxSize()) {
        
        // 类似 header
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(56.dp)
                .background(Color.Blue)
        )
        
        // 类似 main content (flex: 1)
        Row(
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth()
        ) {
            // 类似 sidebar (width: 200px)
            Box(
                modifier = Modifier
                    .width(200.dp)
                    .fillMaxHeight()
                    .background(Color.Gray)
            )
            
            // 类似 content area (flex: 1)
            Box(
                modifier = Modifier
                    .weight(1f)
                    .fillMaxHeight()
                    .background(Color.White)
            )
        }
        
        // 类似 footer
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(48.dp)
                .background(Color.DarkGray)
        )
    }
}
```

### 响应式设计技巧
```kotlin
@Composable
fun ResponsiveLayout() {
    // 根据屏幕宽度选择布局方向
    val configuration = LocalConfiguration.current
    val isPortrait = configuration.orientation == Configuration.ORIENTATION_PORTRAIT
    
    if (isPortrait) {
        Column(modifier = Modifier.fillMaxSize()) {
            ImageSection()
            TextSection()
        }
    } else {
        Row(modifier = Modifier.fillMaxSize()) {
            ImageSection(Modifier.weight(1f))
            TextSection(Modifier.weight(1f))
        }
    }
}
```

## 五、Compose 与 Web 布局思维对比

| **布局概念**         | **Jetpack Compose**                  | **Web (HTML/CSS)**               |
|----------------------|--------------------------------------|----------------------------------|
| **布局模型**         | 基于测量和布局阶段的声明式系统       | 基于盒模型的流式/弹性布局        |
| **尺寸单位**         | 设备无关像素 (dp) 和缩放像素 (sp)    | 像素 (px)、EM、REM、百分比 (%)   |
| **样式应用**         | 通过 Modifier 链式调用               | 通过 CSS 类或内联样式            |
| **响应式设计**       | 基于状态和重组                       | 媒体查询 (Media Queries)         |
| **布局嵌套**         | 深度嵌套常见但推荐提取组件           | 类似，但更强调语义化标签         |
| **性能优化**         | 自动跳过未变化组件的重组             | 需要手动优化重绘和回流           |

## 总结要点

1. **布局选择原则**：
   - 垂直排列 → `Column`
   - 水平排列 → `Row`
   - 重叠元素 → `Box`

2. **尺寸控制**：
   - 优先使用 `fillMaxWidth/Height` 而非固定尺寸
   - `fillMaxSize` = `fillMaxWidth` + `fillMaxHeight`

3. **权重系统**：
   - 仅在 `Row`/`Column` 中使用
   - 父容器需要提供可用空间
   - 避免与固定尺寸修饰符组合使用

4. **前端经验迁移**：
   - `Modifier` ≈ CSS 样式
   - `Arrangement` ≈ `justify-content`
   - `Alignment` ≈ `align-items`
   - `weight` ≈ `flex-grow`