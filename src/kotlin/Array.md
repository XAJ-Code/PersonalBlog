# Kotlin 数组核心知识点详解

Kotlin 中的数组(Array)是一种固定大小的容器，可以存储相同类型的元素。本文将详细介绍 Kotlin 数组的创建、转换、求和、比较等核心操作，包括可变参数(vararg)和数组展开操作符(*)的使用。

## 一、数组的创建

### 1. 使用 `arrayOf` 函数创建数组

```kotlin
// 创建包含任意类型元素的数组
val mixedArray = arrayOf(1, "Hello", 3.14, true)

// 创建整数数组
val intArray = arrayOf(1, 2, 3, 4, 5)
println(intArray.joinToString()) // 输出 1, 2, 3, 4, 5
```

### 2. 使用 `arrayOfNulls` 创建可空元素数组

```kotlin
// 创建包含5个可空String的数组
val nullableStringArray = arrayOfNulls<String>(5)
```

### 3. 使用 `Array` 构造函数创建数组

```kotlin
// 创建一个大小为5的数组，元素通过lambda表达式初始化
val squares = Array(5) { i -> i * i } // [0, 1, 4, 9, 16]
```

### 4. 创建基本类型数组(避免装箱开销)

Kotlin 为每种基本类型提供了专门的数组类：

```kotlin
// Int数组
val intArray = IntArray(5) { it * 2 } // [0, 2, 4, 6, 8]

// Double数组
val doubleArray = DoubleArray(3) { 1.0 / it } // [Infinity, 1.0, 0.5]

// 其他基本类型数组
val charArray = CharArray(4) { 'A' + it } // ['A', 'B', 'C', 'D']
val booleanArray = BooleanArray(2) { it == 1 } // [false, true]
```

## 二、可变参数(vararg)与数组

### 1. 可变参数(vararg)的基本使用

Kotlin 中的 `vararg` 关键字允许函数接受可变数量的参数：

```kotlin
fun printNumbers(vararg numbers: Int) {
    for (number in numbers) {
        println(number)
    }
}

// 调用函数时可以传入任意数量的参数
printNumbers(1, 2, 3)       // 输出 1, 2, 3
printNumbers(4, 5, 6, 7, 8) // 输出 4, 5, 6, 7, 8
```

### 2. 将数组传递给可变参数函数

使用 `*` 操作符(展开操作符)可以将数组展开为可变参数：

```kotlin
val numbers = intArrayOf(1, 2, 3, 4, 5)

// 使用展开操作符将数组传递给vararg参数,类似于JS中的解构...
printNumbers(*numbers) // 等同于 printNumbers(1, 2, 3, 4, 5)
```

### 3. 可变参数在函数定义中的位置

`vararg` 参数必须是函数参数列表中的最后一个参数：

```kotlin
// 正确示例
fun logMessage(message: String, vararg tags: String) {
    println("$message [${tags.joinToString()}]")
}

// 错误示例 - vararg不是最后一个参数
// fun invalidFunction(vararg items: Int, name: String) {} // 编译错误
```

### 4. 可变参数与默认参数结合

```kotlin
fun connect(timeout: Int = 1000, vararg hosts: String) {
    println("Timeout: $timeout, Hosts: ${hosts.joinToString()}")
}

// 调用示例
connect("host1", "host2")       // 使用默认timeout
connect(timeout = 2000, "host1", "host2", "host3") // 指定timeout
```

## 三、数组的基本操作

### 1. 访问和修改元素

```kotlin
val numbers = arrayOf(10, 20, 30, 40)

// 访问元素
val first = numbers[0] // 10

// 修改元素
numbers[1] = 25
```

### 2. 获取数组长度

```kotlin
val length = numbers.size // 4
```

### 3. 遍历数组

```kotlin
// 使用for循环
for (number in numbers) {
    println(number)
}

// 使用索引遍历
for (i in numbers.indices) {
    println("numbers[$i] = ${numbers[i]}")
}

// 使用withIndex获取索引和值
for ((index, value) in numbers.withIndex()) {
    println("index: $index, value: $value")
}
```

## 四、数组转换

### 1. 使用 `map` 转换数组

```kotlin
val numbers = arrayOf(1, 2, 3, 4)
val doubled = numbers.map { it * 2 } // [2, 4, 6, 8]
```

### 2. 使用 `filter` 过滤数组

```kotlin
val numbers = arrayOf(1, 2, 3, 4, 5, 6)
val evens = numbers.filter { it % 2 == 0 } // [2, 4, 6]
```

### 3. 使用 `flatMap` 扁平化转换

```kotlin
val pairs = arrayOf("ab", "cd", "ef")
val letters = pairs.flatMap { it.toList() } // ['a', 'b', 'c', 'd', 'e', 'f']
```

### 4. 使用 `toArray` 转换回数组

```kotlin
val list = numbers.toList()
val arrayAgain = list.toTypedArray() // 转换回数组
```

## 五、数组的数学操作

### 1. 求和

```kotlin
val numbers = intArrayOf(1, 2, 3, 4, 5)
val sum = numbers.sum() // 15

// 对于基本类型数组可以直接使用sum()
// 对于对象数组需要指定转换
val doubleSum = doubleArray.sumOf { it } // 对于DoubleArray
```

### 2. 求平均值

```kotlin
val average = numbers.average() // 3.0
```

### 3. 最大值和最小值

```kotlin
val max = numbers.maxOrNull() // 5
val min = numbers.minOrNull() // 1
```

## 六、数组比较

### 1. 内容比较

```kotlin
val array1 = arrayOf(1, 2, 3)
val array2 = arrayOf(1, 2, 3)
val array3 = arrayOf(1, 2, 4)

// 使用contentEquals比较内容
val isEqual1 = array1.contentEquals(array2) // true
val isEqual2 = array1.contentEquals(array3) // false
```

### 2. 引用比较

```kotlin
// 使用==比较引用(默认行为)
val isSameReference = (array1 === array2) // false
```

### 3. 自定义比较

```kotlin
// 使用自定义比较器
val comparator = compareBy<Int> { it }
val isSorted = numbers.sortedWith(comparator) == numbers // 检查是否已排序
```

## 七、数组排序

### 1. 自然排序

```kotlin
val numbers = intArrayOf(3, 1, 4, 1, 5, 9)
numbers.sort() // 原地排序 [1, 1, 3, 4, 5, 9]
```

### 2. 自定义排序

```kotlin
numbers.sortDescending() // 降序排序 [9, 5, 4, 3, 1, 1]

// 使用自定义比较器
val words = arrayOf("banana", "apple", "cherry")
words.sortWith(compareBy { it.length }) // 按长度排序
```

### 3. 创建排序后的副本

```kotlin
val sortedCopy = numbers.sortedArray() // [1, 1, 3, 4, 5, 9]
val sortedCopyDesc = numbers.sortedArrayDescending() // [9, 5, 4, 3, 1, 1]
```

## 八、多维数组

Kotlin 不直接支持多维数组，但可以通过数组的数组来实现：

```kotlin
// 创建2x3的二维数组
val matrix = Array(2) { IntArray(3) }

// 初始化二维数组
val initializedMatrix = Array(2) { i ->
    IntArray(3) { j -> i * j }
} // [[0, 0, 0], [0, 1, 2]]

// 访问元素
val element = initializedMatrix[1][2] // 2
```

## 九、数组与集合的转换

### 1. 数组转集合

```kotlin
val array = arrayOf(1, 2, 3)
val list = array.toList() // [1, 2, 3]
val set = array.toSet() // [1, 2, 3]
```

### 2. 集合转数组

```kotlin
val list = listOf(1, 2, 3)
val array = list.toTypedArray() // [1, 2, 3]
```

## 十、性能考虑

1. 基本类型数组(`IntArray`, `DoubleArray`等)比对象数组(`Array<Int>`)更高效，因为避免了装箱/拆箱开销
2. 对于频繁访问的操作，数组比集合(如`ArrayList`)更高效
3. 数组大小固定，不适合需要动态调整大小的场景

## 十一、总结

Kotlin 提供了丰富的数组操作功能，包括：
- 多种创建方式
- 灵活的转换操作
- 便捷的数学计算
- 多种比较和排序方法
- 与集合的无缝转换
- 可变参数(vararg)和数组展开操作符(*)的使用

根据具体需求选择合适的数组类型和操作方法，可以编写出既高效又简洁的Kotlin代码。