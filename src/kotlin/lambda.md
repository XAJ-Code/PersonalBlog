# Kotlin Lambda 表达式详解：从入门到实战

## 一、什么是 Lambda 表达式？
Lambda 是**匿名函数**的简洁表示方式，可以直接作为值传递或存储。它让代码更紧凑，特别适合函数式编程和 DSL（如 Jetpack Compose）。

```kotlin
// 传统函数
fun sum(a: Int, b: Int): Int {
    return a + b
}

// Lambda 等效写法
val sum = { a: Int, b: Int -> a + b }
```

## 二、Lambda 核心语法
### 基本结构
```kotlin
{ 参数列表 -> 函数体 }
```

### 特性说明
| 场景               | 示例                          | 说明                     |
|--------------------|-------------------------------|--------------------------|
| 无参数             | `{ println("Hello") }`        | 箭头 `->` 可省略         |
| 单参数             | `list.map { it * 2 }`         | 用 `it` 指代单个参数     |
| 多参数             | `{ x, y -> x + y }`           | 需显式声明参数           |
| 最后一行是返回值   | `{ x -> x * x }`              | 无需 `return` 关键字     |

## 三、Lambda vs 普通函数
### 1. 定义方式对比
```kotlin
// 普通函数
fun square(n: Int): Int {
    return n * n
}

// Lambda
val square = { n: Int -> n * n }
```

### 2. 使用场景对比
| 特性               | Lambda                          | 普通函数                  |
|--------------------|--------------------------------|--------------------------|
| **命名**           | 匿名                           | 需函数名                 |
| **复用性**         | 适合一次性操作                 | 适合重复调用             |
| **作为参数传递**   | 直接内联（如 `button.setOnClickListener { }`） | 需通过函数引用（`::funName`） |

## 四、Lambda 实战示例
### 1. 集合操作
```kotlin
val numbers = listOf(1, 2, 3)

// 过滤偶数
val evens = numbers.filter { it % 2 == 0 }  // [2]

// 转换为字符串
val strings = numbers.map { "Num-$it" }     // ["Num-1", "Num-2", "Num-3"]
```

### 2. 高阶函数参数
```kotlin
fun calculate(a: Int, b: Int, op: (Int, Int) -> Int): Int {
    return op(a, b)
}

// 调用时传入 Lambda
val result = calculate(5, 3) { x, y -> x * y }  // 15
```

### 3. Jetpack Compose 应用
```kotlin
Column {
    Text("Hello")  // Lambda 隐式成为 content 参数
    Button(onClick = { /* Lambda 作为点击事件 */ }) {
        Text("Click")
    }
}
```

## 五、Lambda 的特殊规则
1. **尾随 Lambda**：  
   当 Lambda 是最后一个参数时，可移到括号外：
   ```kotlin
   // 标准写法
   view.setOnClickListener({ v -> println(v) })
   
   // 尾随 Lambda 简化
   view.setOnClickListener { println(it) }
   ```

2. **带接收者的 Lambda**：  
   类似扩展函数，可在 Lambda 内直接访问接收者成员：
   ```kotlin
   val greet: String.() -> Unit = { println("Hello, $this") }
   "Kotlin".greet()  // 输出：Hello, Kotlin
   ```

## 六、性能注意事项
- **内联函数**：使用 `inline` 关键字优化高阶函数中的 Lambda，避免运行时开销：
  ```kotlin
  inline fun measureTime(action: () -> Unit) {
      val start = System.currentTimeMillis()
      action()
      println("Time: ${System.currentTimeMillis() - start}ms")
  }
  ```

> **总结**：Kotlin Lambda 通过简洁的语法实现了强大的函数式编程能力，是现代化 Kotlin 开发的核心特性。掌握它，能让你在集合操作、异步回调、Compose UI 构建等场景中写出更优雅的代码。