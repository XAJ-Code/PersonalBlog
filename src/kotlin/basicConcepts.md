# Kotlin 中的属性与普通变量：概念解析与实战对比（含计算属性、延迟初始化、只读属性）

在 Kotlin 中，“变量”和“属性”这两个概念看似相似，实则有着本质的区别。理解它们的差异对于编写高效、优雅的 Kotlin 代码至关重要。本文将深入解析 Kotlin 中的 **普通变量** 和 **属性** 的概念，同时介绍一些高级特性，如 **计算属性**、**延迟初始化属性** 和 **只读属性**，帮助你全面掌握 Kotlin 的核心特性。

## 一、普通变量（Variable）是什么？

在 Kotlin 中，普通变量分为两种：

- `var`：可变变量，允许重新赋值。
- `val`：不可变变量，赋值后不可更改。

普通变量通常用于存储临时数据，比如函数内部的计数器、临时状态等。

### 示例代码：

```kotlin
fun main() {
    var count = 0          // 可变变量
    val name = "Kotlin"    // 不可变变量

    count = 10             // 可以重新赋值
    // name = "Java"       // 编译错误，val 不可变
    println("Count: $count, Name: $name")
}
```

✅ **普通变量的特点**：

- 定义在函数、类、顶层等任意位置。
- 不属于任何类或对象。
- 没有 getter/setter，也没有幕后字段（Backing Field）。

## 二、属性（Property）是什么？

在 Kotlin 中，**属性（Property）** 是类、对象或接口的成员，用于表示对象的状态。它比普通变量更强大，因为它可以：

- 自动拥有 **getter** 和 **setter** 方法。
- 拥有一个 **幕后字段（Backing Field）**，用于存储实际值。
- 支持自定义访问逻辑（如验证、计算等）。

### 示例代码：

```kotlin
class User {
    var age = 0          // 可变属性，有默认的 getter 和 setter
    val name = "Kotlin"  // 只读属性，只有 getter
    var counter = 0 // 可变属性，自定义 getter 和 setter
        set(value) {
            if (value >= 0){
              //filed是属性的幕后字段，它在内存中保存属性的值来使用,字段不能直接声明
              //field 标识符只能用在属性的访问器内
              field = value
            }
        } 
}

fun main() {
    val user = User()
    user.age = 25          // 调用 age 的 setter
    println("Age: ${user.age}, Name: ${user.name}")  // 调用 age 的 getter 和 name 的 getter
}
```

#### 2.1 幕后字段存在的条件
      - 属性的 getter 或 setter 中使用了 field 关键字。
      - 如果你没有自定义 getter/setter，Kotlin 也会自动为你生成默认的 getter/setter，并且它们会直接读写 field，这时也会有幕后字段。
```kotlin
//这种情况不存在filed
//因为属性的值是动态计算的，不是存储在某个字段里的
val isEmpty: Boolean
    get() = this.size == 0
```
#### 2.2 幕后属性
幕后属性​​ 是指：你在类内部定义一个 ​​私有属性（通常是 private var）​​ 作为真正的值存储的地方（可以理解为“幕后字段”的升级版），然后对外暴露一个 ​​公共的属性（public val/var）​​，这个公共属性通过 getter/setter 来访问或修改那个私有属性
- **幕后属性**​​ 是一个​​私有的属性​​，用于实际存储数据
- 对外呢​是一个公共的属性，通过它的 getter/setter 去访问或修改幕后属性的值
**示例：**
```kotlin
class User {
    // 幕后属性：私有，真正存储数据的地方
    private var _name: String = ""

    // 对外暴露的属性：只读
    val name: String
        get() = _name.uppercase()  // 对外返回大写的名字

    // 提供一个方法来修改 _name
    fun setName(newName: String) {
        _name = newName
    }
}

fun main() {
    val user = User()
    user.setName("kotlin")
    println(user.name)  // 输出 "KOTLIN"
    // user.name = "Java"  // 编译错误，name 是只读的
}
```

✅ **属性的特点**：

- 定义在类、对象或接口内部。
- 属于某个类或对象，表示其状态。
- 可以有自定义的 getter/setter，也可以依赖 Kotlin 自动生成的默认实现。
- 支持幕后字段（除非你完全自定义 getter/setter 且不使用 `field`）。

## 三、属性 vs 普通变量 —— 对比总结

| 对比项 | 普通变量（Variable） | 属性（Property） |
|--------|----------------------|------------------|
| 定义位置 | 函数内部、顶层等任意地方 | 只能在类、对象、接口等类型内部定义 |
| 是否属于某个类 | ❌ 不属于任何类 | ✅ 属于类、对象或接口 |
| 是否可以有 getter/setter | ❌ 没有 | ✅ 可以有自定义的 getter 和 setter |
| 是否可以有幕后字段 | ❌ 没有 | ✅ Kotlin 自动提供（除非你自定义 getter/setter 且不使用 `field`） |
| 用途 | 存储临时数据 | 表示对象的状态 |

## 四、计算属性（Computed Property）

在某些情况下，我们希望属性的值不是直接存储在一个字段中，而是通过某种计算得到。这种属性称为 **计算属性**。

Kotlin 允许你只定义 getter（甚至只定义 setter），而不依赖幕后字段，从而实现计算属性。

### 示例代码：

```kotlin
class Circle(val radius: Double) {
    // 计算属性：面积
    val area: Double
        get() = Math.PI * radius * radius
}

fun main() {
    val circle = Circle(5.0)
    println("圆的面积: ${circle.area}")  // 动态计算
}
```

✅ **计算属性的特点**：

- 不依赖幕后字段（没有 `field`）。
- 每次访问时动态计算值。
- 适用于依赖其他属性或需要实时计算的场景。

## 五、延迟初始化属性（Lazy Initialization）

有时候，我们希望在对象创建时不立即初始化某个属性，而是等到第一次访问时才进行初始化。这种需求可以通过 **延迟初始化** 来实现。

Kotlin 提供了两种方式：

1. `lateinit var`：用于可变变量，必须手动初始化。
2. `by lazy`：用于不可变变量，自动延迟初始化。

### 示例 1：`lateinit var`

```kotlin
class Database {
    lateinit var connection: String  // 声明但不初始化

    fun init() {
      //利用反射来检测属性是否已经初始化
      if(::connection.isInitialized){
          println("已经初始化")
          return
      }
        connection = "Connected to DB"
    }
}

fun main() {
    val db = Database()
    db.init()
    println(db.connection)  // 第一次访问时已经初始化
}
```

> ⚠️ 注意：`lateinit var` 只能用于 `var`，且不能声明为基本类型（如 `Int`、`Double` 等），否则会报错。

### 示例 2：`by lazy`

```kotlin
class Config {
    val configData: String by lazy {
        println("初始化配置数据...")
        "Default Config"
    }
}

fun main() {
    val config = Config()
    println("第一次访问配置：${config.configData}")  // 初始化并打印
    println("第二次访问配置：${config.configData}")  // 直接返回缓存的值
}
```

✅ **`by lazy` 的特点**：

- 只能用于 `val`（不可变属性）。
- 延迟初始化，只有在第一次访问时才会执行初始化代码。
- 线程安全（默认实现是线程安全的）。

## 六、只读属性（Read-Only Property）

在 Kotlin 中，使用 `val` 定义的属性就是只读属性，它只有 getter 方法，没有 setter 方法，因此赋值后不能被修改。

### 示例代码：

```kotlin
class Person(val id: Int, val name: String)

fun main() {
    val person = Person(1, "Kotlin")
    // person.name = "Java"  // 编译错误，val 不可变
    println("ID: ${person.id}, Name: ${person.name}")
}
```

✅ **只读属性的特点**：

- 使用 `val` 定义。
- 只有 getter 方法，没有 setter 方法。
- 适用于表示不可变的状态，如常量、配置项等。

## 七、总结

| 特性 | 普通变量 | 属性 |
|------|----------|------|
| 定义位置 | 函数、顶层等任意位置 | 类、对象、接口内部 |
| 是否属于类 | ❌ 不属于 | ✅ 属于 |
| 是否有 getter/setter | ❌ 没有 | ✅ 有（可自定义） |
| 是否支持幕后字段 | ❌ 没有 | ✅ 有（除非完全自定义 getter/setter） |
| 是否支持计算属性 | ❌ 不支持 | ✅ 支持 |
| 是否支持延迟初始化 | ❌ 不支持 | ✅ 支持（`lateinit var` 或 `by lazy`） |
| 是否支持只读属性 | ❌ 不支持 | ✅ 支持（`val`） |