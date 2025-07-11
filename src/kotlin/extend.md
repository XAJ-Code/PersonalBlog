# Kotlin 扩展与伴生对象详解

## 扩展（Extensions）

Kotlin 扩展允许在不修改原有类的情况下，为类添加新功能。
- 扩展的作用域,大多数情况都在顶层定义扩展——直接在包里
- 在文件顶层声明的扩展可以访问同一文件中的其他 private **顶层声明**
- 如果扩展是在其接收者类型外部声明的，那么它不能访问接收者的 private 或 protected 成员。

### 扩展函数

**语法：**
```kotlin
fun ClassName.functionName(parameters): ReturnType {
    // 函数体
}
```

**示例：**
```kotlin
// 为String添加扩展函数
fun String.addExclamation(): String = "$this!"

fun main() {
    println("Hello".addExclamation()) // 输出: Hello!
}
```
```kotlin
//1.扩展函数
class MyKotLinClass(val name: String) {
    private var fullName: String = name
    var phoneNumber: Int? = null

    init {
        fullName = this.fullName + "555"
    }
    companion object{
        fun test(){}
    }
}

//不使用继承的情况下扩展类
fun MyKotLinClass.addPhoneNumber(number: Int): Unit {
    this.phoneNumber = number
}

//2.扩展属性
val MyKotLinClass.age: Int
    get() = this.age
var MyKotLinClass.weight: Double
    get() = this.weight
    set(value) {
        this.weight = value
    }

fun main() {
    val gh = MyKotLinClass("<UNK>")
    gh.addPhoneNumber(151)
    gh.weight = 25.3
    //可直接通过类名调用伴生对象
    MyKotLinClass.test()
}
```

**用途：**
1. 为第三方库添加功能
2. 创建DSL（领域特定语言）
3. 添加工具函数

### 扩展属性

**语法：**
```kotlin
val ClassName.propertyName: PropertyType
    get() = /* 实现 */
```

**示例：**
```kotlin
val String.lastChar: Char
    get() = this[length - 1]

fun main() {
    println("Kotlin".lastChar) // 输出: n
}
```

### 重要特性
- 静态解析（编译时确定）
- 可定义可空接收者
- 不能访问私有成员

## 伴生对象（Companion Object）

伴生对象是类内部声明的特殊对象，成员可通过类名直接访问。

### 伴生对象的扩展
- 如果一个类定义有一个伴生对象 ，你也可以为伴生对象定义扩展函数与属性。就像伴生对象的常规成员一样， 可以只使用类名作为限定符来调用伴生对象的扩展成员

**示例：**
```kotlin
class MyClass {
    companion object { }  // 将被称为 "Companion"
}
//扩展
fun MyClass.Companion.printCompanion() { println("companion") }

fun main() {
    MyClass.printCompanion()
}
```

### 基本语法

```kotlin
class MyClass {
    companion object {
        // 属性和方法
    }
}
```

### 典型示例

**工厂方法：**
```kotlin
class User private constructor(val name: String) {
    companion object {
        fun create(name: String): User = User(name)
    }
}

// 使用
val user = User.create("Alice")
```

**常量定义：**
```kotlin
class Config {
    companion object {
        const val API_KEY = "12345"
        const val TIMEOUT = 5000
    }
}
```

**实现接口：**
```kotlin
interface Factory<T> {
    fun create(): T
}

class Product {
    companion object : Factory<Product> {
        override fun create() = Product()
    }
}
```

### 与Java静态成员的对比

| 特性            | Java静态成员         | Kotlin伴生对象          |
|----------------|---------------------|------------------------|
| 定义方式        | `static`关键字       | `companion object`     |
| 常量定义        | `static final`      | `const val`            |
| 实现接口        | 不能实现接口         | 可以实现接口           |
| 继承            | 不能继承             | 可以继承类             |

### 实际应用场景

1. **替代静态工厂方法**
2. **集中管理类常量**
3. **实现静态工厂接口**
4. **替代工具类（结合扩展使用）**

```kotlin
// 工具类替代方案
class StringUtils {
    companion object {
        fun isBlank(string: String): Boolean {
            return string.isBlank()
        }
    }
}

// 更Kotlin的方式（使用扩展）
fun String.isBlankExt(): Boolean = isBlank()
```

### 注意事项

1. 伴生对象实际上是单例实例对象
2. 如需Java互操作，可使用`@JvmStatic`注解
3. 伴生对象可以有名称（默认名称`Companion`）

```kotlin
class WithNamedCompanion {
    companion object Named {
        fun create() = WithNamedCompanion()
    }
}
```

## 扩展与伴生对象结合使用

```kotlin
class DateUtils {
    companion object {
        val now: Long get() = System.currentTimeMillis()
    }
}

// 为Long添加扩展函数
fun Long.toDateString(): String {
    return SimpleDateFormat("yyyy-MM-dd").format(Date(this))
}

// 使用
val timestamp = DateUtils.now
println(timestamp.toDateString())
```