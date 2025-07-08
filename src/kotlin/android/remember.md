# Jetpack Compose 状态管理：remember 与 mutableStateOf 完全指南

- mutableStateOf 创建一个可观察的状态对象，当该状态的值发生变化时，所有读取该状态的 Composable 函数都会自动重组,能够自动跟踪状态变化并重组相关的 UI 组件
- remember 是 Jetpack Compose 中用于​​跨重组保持状态​​的核心 API，它与 mutableStateOf 配合使用可以创建在重组过程中持久化的状态,​​缓存计算结果​​：避免每次重组都重新计算

## 一、核心概念对比

| 特性                | `remember`                          | `mutableStateOf`                  |
|---------------------|------------------------------------|-----------------------------------|
| **本质**            | 缓存机制                           | 可观察状态容器                     |
| **主要作用**        | 避免重复计算/保持引用               | 存储可变值并触发重组               |
| **生命周期**        | 绑定组合作用域                     | 依赖存储位置（通常配合remember使用）|
| **典型使用场景**    | 缓存计算结果、保持对象引用           | UI状态管理、数据驱动更新           |

## 二、`mutableStateOf` 深度解析

### 1. 基本用法
```kotlin
// 方式1：属性委托（推荐）
var text by mutableStateOf("")
Text(text) // 自动订阅变化

// 方式2：直接访问
val textState = mutableStateOf("")
Text(textState.value) 

// 方式3：解构声明
val (text, setText) = mutableStateOf("")
```

### 2. 重组控制策略
```kotlin
// 默认：结构相等比较
var a by mutableStateOf(obj, policy = structuralEqualityPolicy())

// 引用相等比较
var b by mutableStateOf(obj, policy = referentialEqualityPolicy())

// 总是重组
var c by mutableStateOf(obj, policy = neverEqualPolicy())
```

### 3. 性能优化技巧
- **状态提升**：将状态移到调用方控制重组范围
- **局部状态**：使用`remember`限制作用域
- **派生状态**：`derivedStateOf`减少不必要重组

## 三、`remember` 核心原理

### 1. 工作机制图解
```
首次组合 -> 执行lambda并存储结果
   ↑
   │ 重组时
   ↓
直接返回缓存值（除非key变化）
```

### 2. 带依赖项的用法
```kotlin
@Composable
fun UserProfile(userId: String) {
    // 当userId变化时重新计算
    val userData = remember(userId) {
        fetchUserData(userId) 
    }
}
```

### 3. 生命周期控制
```kotlin
// 普通remember - 组合退出时释放
val timer = remember { 
    Timer().apply { start() }
}

// rememberSaveable - 跨配置变更保持
val input by rememberSaveable { mutableStateOf("") }
```

## 四、组合使用模式

### 1. 标准状态管理
```kotlin
@Composable
fun Counter() {
    val count = remember { mutableStateOf(0) }
    Button(onClick = { count.value++ }) {
        Text("Count: ${count.value}")
    }
}
```

### 2. 与ViewModel集成
```kotlin
class MyViewModel : ViewModel() {
    var uiState by mutableStateOf(MyUiState())
        private set
}

@Composable
fun MyScreen(viewModel: MyViewModel) {
    val state by viewModel.uiState
    // 使用状态...
}
```

### 3. 性能敏感场景
```kotlin
@Composable
fun LargeList(items: List<Item>) {
    // 只有滚动位置变化时重组
    val scrollState = rememberScrollState()
    val visibleItems by remember {
        derivedStateOf {
            items.slice(scrollState.value..scrollState.value+10)
        }
    }
}
```

## 五、常见问题解决方案

### 1. 状态意外重置
**问题现象**：旋转屏幕后状态丢失  
**修复方案**：
```kotlin
val savedState = rememberSaveable {
    mutableStateOf("") 
}
```

### 2. 过度重组
**问题现象**：无关状态变化导致UI频繁更新  
**优化方案**：
```kotlin
val filteredList by remember(items, filter) {
    derivedStateOf { items.filter { it.match(filter) } }
}
```

### 3. 内存泄漏
**危险代码**：
```kotlin
remember { SomeActivityResource() } // 可能泄漏Activity
```
**安全写法**：
```kotlin
remember { WeakReference(resource) }
```

## 六、最佳实践清单

1. **优先使用属性委托语法**：`by mutableStateOf()`
2. **细粒度记忆**：只`remember`真正需要保持的对象
3. **明确依赖项**：为带参数的remember指定所有变化因素
4. **大列表优化**：结合`derivedStateOf`和`LazyColumn`
5. **测试策略**：使用`TestMonitor`验证重组次数

> "Compose中的状态不是敌人，而是需要驯服的力量" —— Android开发者宣言

## 延伸阅读
- https://developer.android.com/jetpack/compose/state
- https://developer.android.com/jetpack/compose/state-hoisting
```