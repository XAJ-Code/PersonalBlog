# Kotlin 数据类（Data Class）详解

数据类是 Kotlin 中专门用于存储数据的特殊类，通过 `data` 关键字声明，自动为类生成标准功能。

## 基本语法

```kotlin
data class User(val name: String, val age: Int)
```

## 自动生成的功能

1. **`equals()`/`hashCode()`** - 基于所有属性的值比较
2. **`toString()`** - 格式如 `"User(name=John, age=42)"`
3. **`componentN()` 函数** - 按声明顺序对应属性
4. **`copy()` 函数** - 用于复制对象并修改部分属性

## 典型示例

### 基本使用

```kotlin
data class Person(val name: String, val age: Int)

fun main() {
    val person1 = Person("Alice", 25)
    val person2 = Person("Alice", 25)
    
    println(person1 == person2)  // true，内容相同
    println(person1)             // 自动生成toString: "Person(name=Alice, age=25)"
    
    // 解构声明
    val (name, age) = person1
    println("$name is $age years old") // Alice is 25 years old
    
    // copy函数
    val olderAlice = person1.copy(age = 26)
    println(olderAlice) // Person(name=Alice, age=26)
}
```

## 使用规范

1. **主构造函数要求**：
   - 必须至少有一个参数
   - 所有参数必须标记为 `val` 或 `var`

2. **继承限制**：
   - 不能是抽象的、开放的、密封的或内部的
   - 可以继承其他类或实现接口

```kotlin
data class Employee(val id: Int, val name: String) : Person(name)
```

## 高级用法

### 自定义行为

```kotlin
data class User(val name: String) {
    var age: Int = 0 // 不会纳入equals/hashCode/toString等自动生成的方法
    
    // 可以重写自动生成的方法
    override fun toString(): String {
        return "User[name=$name, age=$age]"
    }
}
```

### 标准数据类方法

```kotlin
data class Book(val title: String, val author: String, val year: Int)

fun main() {
    val book = Book("Kotlin in Action", "Dmitry Jemerov", 2017)
    
    // 解构声明
    val (title, author, year) = book
    
    // 复制并修改
    val newEdition = book.copy(year = 2022)
}
```

## 实际应用场景

1. **DTO（数据传输对象）**
   ```kotlin
   data class LoginRequest(val username: String, val password: String)
   ```

2. **API响应模型**
   ```kotlin
   data class ApiResponse<T>(val success: Boolean, val data: T, val message: String?)
   ```

3. **数据库实体**
   ```kotlin
   data class Product(
       val id: Long,
       val name: String,
       val price: Double,
       val inStock: Boolean = true
   )
   ```

4. **配置参数**
   ```kotlin
   data class AppConfig(
       val apiUrl: String,
       val timeout: Long,
       val retryCount: Int = 3
   )
   ```

## 注意事项

1. **可变性问题**：
   - 建议将数据类属性声明为 `val`（不可变）
   - 如需修改，使用 `copy()` 函数创建新实例

2. **数组和集合属性**：
   - 数组和集合内容变化不会影响 `equals()`/`hashCode()`
   - 需要特别注意这一点

3. **继承问题**：
   - 如果基类有 `equals()`/`hashCode()`/`toString()` 实现，数据类不会覆盖它们

4. **性能考虑**：
   - 对于极简单的数据（如仅包含一个属性），普通类可能更高效

数据类是 Kotlin 中非常实用的特性，可以显著减少样板代码，特别适合用于模型类、值对象等场景。合理使用数据类可以使代码更加简洁、安全和易于维护。