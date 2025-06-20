# Kotlin 中的类：主构造函数、次构造函数与 `init` 初始化块详解

在 Kotlin 中，**类（Class）** 是构建面向对象程序的基本单元。Kotlin 的类设计简洁而强大，支持许多现代语言特性，例如数据类、密封类、属性委托等。本文将重点介绍 Kotlin 类的核心概念，包括**主构造函数**、**次构造函数** 以及 `init` 初始化块的使用。
## 一、Kotlin 类的基本结构

在 Kotlin 中，定义一个类非常简单：

```kotlin
class Person {
    // 类体
}
```

这是一个最简单的类定义，没有任何属性或方法。我们可以在类中定义属性、方法、初始化块等。

## 二、主构造函数（Primary Constructor）

### 1. 什么是主构造函数？

**主构造函数**是类声明的一部分，位于类头（class header）中。它是类的主要构造方式，通常用于初始化类的核心属性。

### 2. 主构造函数的定义

如果主构造函数没有注解或可见性修饰符（如 `public`、`private` 等），`constructor` 关键字可以省略：

```kotlin
class Person(name: String, age: Int)
```

如果需要为构造函数参数声明属性，可以使用 `val` 或 `var`：

```kotlin
class Person(val name: String, var age: Int)
```

这样，`name` 和 `age` 不仅是构造函数的参数，同时也是类的属性，可以直接在类内部访问和修改（如果是 `var`）。

### 3. 使用 `init` 初始化块

主构造函数**不能直接包含代码**，但你可以通过 `init` 初始化块来执行一些初始化逻辑：

```kotlin
class Person(val name: String, var age: Int) {
    init {
        println("Person created: $name, $age")
    }
}
```

> `init` 块可以有多个，它们会按照在类中出现的顺序依次执行。

---

## 三、次构造函数（Secondary Constructor）

### 1. 什么是次构造函数？

**次构造函数**是类中额外定义的构造函数，用于提供更多的构造方式。如果类有主构造函数，次构造函数必须通过 `this` 关键字委托给主构造函数。

### 2. 次构造函数的定义

```kotlin
class Person {
    constructor(name: String) {
        println("Secondary Constructor: $name")
    }
}
```

如果类有主构造函数，次构造函数必须委托给主构造函数：

```kotlin
class Person(val name: String, var age: Int) {
    constructor(name: String) : this(name, 0) {
        println("Secondary Constructor with default age")
    }
}
```

> 注意：如果类有主构造函数，所有的次构造函数都必须直接或间接调用主构造函数。

---

## 四、没有主构造函数的类

如果一个类**没有显式声明主构造函数**，那么它就没有主构造函数，此时可以自由定义多个次构造函数，且不需要委托给主构造函数。

```kotlin
class Person {
    constructor(name: String) {
        println("Name: $name")
    }

    constructor(name: String, age: Int) {
        println("Name: $name, Age: $age")
    }
}
```

这种类通常用于**不依赖外部参数进行初始化**，或者需要提供多种不同参数组合的构造方式。

## 五、`init` 初始化块详解

`init` 是 Kotlin 提供的一种初始化机制，它允许你在主构造函数执行时运行一些代码。即使主构造函数本身不能包含代码，你也可以通过 `init` 块来执行初始化操作。

### 1. `init` 的执行顺序

如果类中有多个 `init` 块，它们会按照在类中出现的顺序依次执行：

```kotlin
class Person(val name: String, var age: Int) {
    init {
        println("First init block: $name")
    }

    init {
        println("Second init block: $age")
    }
}
```

当创建 `Person` 的实例时，输出如下：

```kotlin
Person(Alice, 25)
First init block: Alice
Second init block: 25
```

### 2. `init` 与主构造函数的配合

`init` 块通常用于执行一些与主构造函数参数相关的初始化逻辑，比如验证参数、打印日志等。

```kotlin
class Person(val name: String, var age: Int) {
    init {
        require(age >= 0) { "Age must not be negative" }
        println("Person created: $name, $age")
    }
}
```
> `require` 是 Kotlin 标准库中的一个函数，用于参数校验。如果条件不满足，会抛出 `IllegalArgumentException`。
---

## 六、构造函数与继承

在 Kotlin 中，继承是通过 `:` 符号实现的。子类必须调用父类的构造函数，无论是主构造函数还是次构造函数。

### 1. 子类调用父类的主构造函数

```kotlin
open class Animal(val name: String)

class Dog(name: String, val breed: String) : Animal(name)
```

在这个例子中，`Dog` 的主构造函数调用了父类 `Animal` 的主构造函数。

### 2. 子类调用父类的次构造函数

如果父类没有主构造函数，子类必须通过次构造函数来调用父类的构造函数：

```kotlin
open class Animal {
    constructor(name: String) {
        println("Animal created: $name")
    }
}

class Cat : Animal {
    constructor(name: String) : super(name) {
        println("Cat created: $name")
    }
}
```

---

## 七、完整示例

下面是一个综合了主构造函数、次构造函数和 `init` 块的完整示例：

```kotlin
class Person(val name: String, var age: Int) {
    init {
        println("First init block: $name")
        require(age >= 0) { "Age must not be negative" }
    }

    init {
        println("Second init block: $age")
    }

    constructor(name: String) : this(name, 0) {
        println("Secondary Constructor with default age")
    }
}

fun main() {
    val person1 = Person("Alice", 25)
    println("-----")
    val person2 = Person("Bob")
}
```

**输出结果：**

```
First init block: Alice
Second init block: 25
-----
First init block: Bob
Second init block: 0
Secondary Constructor with default age
```

---

## 八、抽象类
- 类以及其中的某些或全部成员可以声明为 `abstract`。抽象类不能被实例化，但可以有抽象成员。抽象成员在子类中实现。
- 抽象成员在子类中实现，子类也可以声明为抽象类。

**抽象类示例：**
```kotlin
//使用abstract关键字声明抽象类
abstract class Polygon {
    abstract fun draw()
}

class Rectangle : Polygon() {
    override fun draw() {
        // draw the rectangle
    }
}
```
- 可以用一个抽象成员覆盖一个非抽象的开放成员
**示例：**

```kotlin
open class Polygon {
    open fun draw() {
        // some default polygon drawing method
    }
}

abstract class WildShape : Polygon() {
    // Classes that inherit WildShape need to provide their own
    // draw method instead of using the default on Polygon
    abstract override fun draw()
}
```
## 九、伴生对象
- 一个类中可以有一个伴生对象，伴生对象是静态成员的容器，伴生对象通过 `companion` 关键字声明，伴生对象的名字可以省略，直接使用 `companion` 代替。
- 伴生对象可以访问类中的所有成员，包括 `private` 成员。
- 伴生对象通过 `this` 关键字访问类中的成员，也可以通过类名直接访问。
```kotlin
class User(val name: String) {
    // Defines a companion object that acts as a factory for creating User instances
    companion object Factory {
        fun create(name: String): User = User(name)
    }
}

fun main() {
    val user = User.create("Alice")
    println(user.name)
}

```

## 十、总结

| 概念 | 说明 |
|------|------|
| **主构造函数** | 类声明的一部分，用于定义主要的构造方式，可以声明属性，配合 `init` 块进行初始化 |
| **次构造函数** | 类体中定义的额外构造函数，用于提供更多构造方式，必须委托给主构造函数（如果有） |
| **init 块** | 用于在主构造函数中执行初始化代码，可以有多个，按顺序执行 |
| **没有主构造函数的类** | 可以自由定义多个次构造函数，不需要委托给主构造函数 |
| **继承中的构造函数** | 子类必须调用父类的构造函数，无论是主构造还是次构造 |

**注意：**
- 要继承一个类，那么继承的类必须包含主构造函数，或者包含一个委托给主构造函数的次构造函数。
- 被继承的类必须包含 `open` 关键字，表示可以被继承---称为开放类。
- 子类使用 `override` 关键字重写开放类的成员，表示重写开放类中的成员---称为重写成员。
- 抽象类可以不用`open`关键字来声明，因为抽象类就是用来被继承的，所以不需要`open`关键字来修饰。
- 抽象类也可以继承其他的不是抽象的类