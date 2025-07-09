# Kotlin 接口全解析：普通接口 vs 函数式接口

## 一、核心概念对比

| 特性                | 普通接口                          | 函数式接口 (SAM)                |
|---------------------|----------------------------------|---------------------------------|
| **抽象方法数量**     | 可包含多个抽象方法                | 只能有**一个**抽象方法           |
| **声明方式**        | `interface` 关键字                | `fun interface` 关键字 (Kotlin 1.4+) |
| **实现方式**        | 必须完整实现所有方法               | 可用Lambda表达式简化实现          |
| **典型用途**        | 定义复杂行为契约                  | 回调、事件处理等简单场景          |
| **内存开销**        | 匿名类实现会产生新对象             | Lambda可能被优化为单例           |

## 二、普通接口详解
-  Kotlin 的接口可以既包含抽象方法的声明也包含实现。与抽象类不同的是，接口无法保存状态。它可以有属性但必须声明为抽象或提供访问器实现。

### 1. 基本语法
```kotlin
interface Animal {
    fun eat(food: String)
    fun sleep(hours: Int): Boolean
}
```

### 2. 实现方式
```kotlin
class Cat : Animal {
    override fun eat(food: String) {
        println("吃$food")
    }
    
    override fun sleep(hours: Int): Boolean {
        println("睡$hours小时")
        return hours > 5
    }
}
```

### 3. 高级特性
- **默认实现**：
  ```kotlin
  interface Animal {
      fun move() { println("移动中...") } // 非抽象方法
  }
  ```
- **接口继承**：
  ```kotlin
  interface Pet : Animal {
      fun play()
  }
  ```

## 三、函数式接口深入
- 只有一个**抽象成员**函数的接口称为函数式接口或 单一抽象方法（SAM）接口--Single Abstract Method
- Kotlin 1.4+ 新增了 `fun interface` 关键字，用于声明函数式接口
- 可以有多个非抽象成员

### 1. 声明规范
```kotlin
fun interface ClickListener {
    fun onClick(event: Event): Boolean // 唯一抽象方法
}
```

### 2. 三种实现方式
```kotlin
// 方式1：Lambda表达式（推荐）
val listener1 = ClickListener { event -> 
    println("处理点击: $event")
    true 
}

// 方式2：匿名对象
val listener2 = object : ClickListener {
    override fun onClick(event: Event) = true
}

// 方式3：函数引用
fun handleClick(event: Event) = true
val listener3 = ClickListener(::handleClick)
```

### 3. 性能优化技巧
```kotlin
// 将Lambda赋值给变量避免重复创建
val sharedListener = ClickListener { /*...*/ }

// 与object声明结合保证单例
object GlobalListeners {
    val confirmListener = ClickListener { /*...*/ }
}
```

## 四、实际应用场景

### 1. 普通接口最佳场景
```kotlin
// 复杂行为契约
interface DatabaseClient {
    fun connect(config: Config)
    fun query(sql: String): ResultSet
    fun close()
    val isConnected: Boolean
}
```

### 2. 函数式接口典型用例
```kotlin
// 事件处理
fun interface TextChangedListener {
    fun onTextChanged(old: String, new: String)
}

// 异步回调
fun loadData(callback: (Result) -> Unit) {
    /*...*/
}
```

## 五、互操作与转换

### 1. 与Java互操作
```kotlin
// Java的Runnable
val javaRunnable = Runnable { println("Running") }

// Kotlin函数式接口转Java
fun execute(runnable: java.lang.Runnable) {
    runnable.run()
}
```

### 2. 相互转换技巧
```kotlin
// 普通接口转函数式（需满足SAM条件）
interface OldInterface { fun doWork() } // 实际符合SAM条件

val asFunctional = OldInterface { println("适配后的调用") }
```

## 六、选择指南

**使用普通接口当：**
- 需要定义多个相关方法
- 接口需要被多次继承
- 需要提供默认实现

**使用函数式接口当：**
- 只需要单个回调方法
- 配合Lambda简化代码
- 与Java函数式接口交互

## 七、常见问题解答

**Q：函数式接口可以有默认方法吗？**
A：可以，但依然只能有一个抽象方法

**Q：为什么我的Lambda不能自动转换？**
A：检查是否满足：
1. 接口确实声明为`fun interface`
2. 只有一个抽象方法
3. Lambda参数和返回值类型匹配

**Q：性能差异大吗？**
A：在频繁创建场景下，函数式接口通常更优

## 延伸阅读
- https://kotlinlang.org/docs/interfaces.html
- https://book.kotlincn.net/text/fun-interfaces.html

> "面向对象编程通过普通接口描述事物，函数式编程通过函数式接口传递行为" —— Kotlin设计哲学