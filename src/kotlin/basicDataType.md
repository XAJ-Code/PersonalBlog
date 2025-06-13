# Kotlin 基本数据类型

Kotlin 提供了一系列基本数据类型（Primitive Data Types）用于表示数字、字符、布尔值等。虽然 Kotlin 本身是面向对象的，但基本数据类型会被自动装箱为对应的包装类（如 `Int` 对应 `Integer`），但在 JVM 上，它们会被编译为 Java 的基本类型以提高性能。

---

## 1. 数字类型 (Numeric Types)

### 1.1 整数类型 (Integer Types)

| 类型    | 位数 (Bits) | 字节 (Bytes) | 取值范围 (Signed)       | 取值范围 (Unsigned)       | 默认值 |
|---------|------------|-------------|------------------------|--------------------------|--------|
| `Byte`  | 8          | 1           | -128 到 127            | 0 到 255 (`UByte`)       | 0      |
| `Short` | 16         | 2           | -32,768 到 32,767      | 0 到 65,535 (`UShort`)   | 0      |
| `Int`   | 32         | 4           | -2,147,483,648 到 2,147,483,647 | 0 到 4,294,967,295 (`UInt`) | 0      |
| `Long`  | 64         | 8           | -9,223,372,036,854,775,808 到 9,223,372,036,854,775,807 | 0 到 18,446,744,073,709,551,615 (`ULong`) | 0L     |

**注意：**
- `Long` 类型字面量需要在数字后加 `L` 后缀（如 `100L`）。
- 无符号类型（`UByte`, `UShort`, `UInt`, `ULong`）需要 Kotlin 1.3+ 版本支持。

**示例：**
```kotlin
val byteValue: Byte = 127
val shortValue: Short = 32767
val intValue: Int = 2147483647
val longValue: Long = 9000000000L  // 必须加 L 后缀
```

### 1.2 浮点类型 (Floating-Point Types)
| 类型    | 位数 (Bits) | 字节 (Bytes) | 取值范围 (Signed)       | 取值范围 (Unsigned)       | 默认值 |
|----------|-------------|-------------|------------------------|--------------------------|--------|
| `Float`  | 32          | 4           | ±1.4E-45 到 ±3.4028235E38 | 无符号浮点类型不支持 | 0.0f      |
| `Double` | 64          | 8           | ±4.9E-324 到 ±1.7976931348623157E308 | 无符号双精度类型不支持 | 0.0      |

**注意：**
- `Float` 类型字面量需要在数字后加 `f` 或 `F` 后缀（如 `100f`）。
- 默认值是 `Double` 类型（不加后缀）。
**示例：**
```kotlin
val floatValue: Float = 123.5f
val doubleValue: Double = 123.5
```

## 2. 字符类型 (Character Type)
| 类型    | 位数 (Bits) | 字节 (Bytes) | 取值范围 (Signed)       | 描述       | 默认值 |
|---------|------------|-------------|------------------------|--------------------------|--------|
| `Char`  | 16         | 2           | U+0000 到 U+FFFF       | 表示一个 Unicode 字符 | '\u0000'      |

**注意：**
- `Char` 类型字面量需要使用单引号（如 `'a'`）。
- 不能直接对 `Char` 类型的值进行算术运算，但可以使用 `Char` 类型的 `toInt()` 方法将其转换为 `Int` 类型，然后进行运算。
**示例：**
```kotlin
val charValue: Char = 'a'
println(charValue.toInt() + 1)  // 输出 101
println(charValue.code)  // 输出 Unicode 码点 (65)
```

## 3. 布尔类型 (Boolean Type)
| 类型    | 位数 (Bits) | 字节 (Bytes) | 取值范围 (Signed)       | 描述       | 默认值 |
|---------|------------|-------------|------------------------|--------------------------|--------|
| `Boolean`  | 8(通常表示)          | 1           | true 或 false          | 表示逻辑值 | false      |
**注意：**
- `Boolean` 类型字面量需要使用 `true` 或 `false`。
**示例：**
```kotlin
val booleanValue: Boolean = true
```

## 4.字符串类型 (String Type)
- 虽然 String 不是基本数据类型，但它是 Kotlin 中最常用的引用类型之一，因此这里也将其归类为基本数据类型。
- Kotlin 中的字符串是由字符组成的序列，可以使用双引号（`"`）或反引号（ ``）来创建字符串。
- 反引号（`` ` ``）可以用来创建多行字符串，反引号中的所有内容都会被解析为字符串的一部分，包括换行符。
- 反引号（`` ` ``）还可以用来创建模板字符串，模板字符串中的变量可以使用 `${}` 来引用。

| 类型    | 位数 (Bits) | 字节 (Bytes) | 取值范围 (Signed)       | 描述       | 默认值 |
|---------|------------|-------------|------------------------|--------------------------|--------|
| `String`  | 16(通常表示)          | 2           | 无 | 表示文本,不可变的 Unicode 字符序列 | ""      |

**示例：**
```kotlin
val stringValue: String = "Hello, World!"
val multilineStringValue: String = "\nHello,\nWorld!\n"
val templateStringValue: String = "Hello, ${name}!"  // 模板字符串
```

## 5.类型推断与转换
### 5.1 类型推断
Kotlin 是一门静态类型语言，因此每个变量和表达式都有一个类型。在大多数情况下，编译器可以自动推断出变量的类型，因此不需要显式指定类型。例如，下面的代码中，编译器可以自动推断出 `num` 变量的类型为 `Int`。
```kotlin
val num = 10  // num 的类型为 Int
val inferredDouble = 3.14 // 推断为 Double
```
### 5.2 显式类型声明
在某些情况下，编译器无法自动推断出变量的类型，这时需要显式指定变量的类型。例如，下面的代码中，由于 `num` 的值是字符串，因此需要显式指定其类型为 `String`。
```kotlin
val num: String = "10"  // num 的类型为 String
val explicitInt: Int = 42 // 显式指定类型为 Int
```
### 5.3 类型转换
Kotlin 要求显式类型转换（避免隐式转换带来的风险）：
| 转换函数   |  描述  |
|------------|--------|
| `toByte()` | 	转换为 Byte |
| `toShort()` |   转换为 Short |
| `toInt()` |   转换为 Int |
| `toLong()` |   转换为 Long |
| `toFloat()` |   转换为 Float |
| `toDouble()` |   转换为 Double |
| `toChar()` |   转换为 Char |

**示例：**
```kotlin
val intValue: Int = 100
val longValue: Long = intValue.toLong()  // Int -> Long
```
## 6.数值字面量的表示方式
### 6.1 整数字面量
- 十进制：123
- 十六进制：0x0F(前缀为 0x 或 0X)
- 二进制：0b00001011(前缀为 0b 或 0B)
**示例：**
```kotlin
val hexValue = 0xFF  // 255
val binaryValue = 0b1010  // 10
```
### 6.2 浮点数字面量
- 默认情况下，浮点数字面量默认为双精度浮点数（`Double` 类型）。
- 标准表示：3.14
- 科学计数法：1.23e2（表示 1.23 x 10^2），1.23E2（表示 1.23 x 10^2）

**示例：**
```kotlin
val scientificValue = 1.23e10  // 1.23 × 10^10
```

## 7.注意事项
### 1. Int 和 Long 的范围​​：
    - 3000000000 超过 Int 的最大值 (2,147,483,647)，必须声明为 Long (加 L 后缀)。
### 2. Float 和 Double 的精度：
    - 0.1 + 0.2 不等于 0.3，因为浮点数不是精确的。
    - Float 可能丢失精度，科学计算推荐使用 Double。
### 3. 字符与数字：
    - 字符字面量必须使用单引号 (')。
    - Char 不能直接当作数字使用，需要调用 .toInt() 转换。

## 8.总结
| 类型   |  关键特点  |
|--------|--------|
|整数类型 | Byte、Short、Int、Long |
|浮点类型 | Float、Double |
|字符类型 | Char |
|布尔类型 | Boolean |
|字符串类型 | String(不可变) |
