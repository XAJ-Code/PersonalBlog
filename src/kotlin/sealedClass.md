# Kotlin 密封类（Sealed Class）与密封接口（Sealed Interface）详解

密封类和密封接口是 Kotlin 中用于**限制继承层次结构**的特殊类型，它们允许你定义一组有限的子类型，为编译器提供完整的类型信息。

## 密封类（Sealed Class）

### 基本概念

密封类使用 `sealed` 关键字声明，其主要特点是：
- 所有子类必须在同一文件中声明（Kotlin 1.1 后放宽到同一模块）
- 可以包含抽象成员和具体实现
- 默认是抽象的，不能直接实例化

### 基本语法

```kotlin
sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Error(val exception: Exception) : Result<Nothing>()
    object Loading : Result<Nothing>()
}
```

### 主要特点

1. **受限的继承**：所有子类必须在编译时已知
2. **模式匹配友好**：与 `when` 表达式完美配合
3. **可包含状态**：可以是普通类、数据类或对象
4. **可带泛型参数**：支持泛型类型参数

### 使用示例

```kotlin
fun handleResult(result: Result<String>) = when(result) {
    is Result.Success -> println("Success: ${result.data}")
    is Result.Error -> println("Error: ${result.exception}")
    Result.Loading -> println("Loading...")
}
// 不需要else分支，因为所有情况已覆盖
```

## 密封接口（Sealed Interface）

Kotlin 1.5 引入了密封接口，扩展了密封类的概念：

### 基本语法

```kotlin
sealed interface Error {
    val message: String
}

class NetworkError(override val message: String) : Error
class DatabaseError(override val message: String) : Error
```

### 与密封类的区别

| 特性                | 密封类                     | 密封接口                  |
|---------------------|---------------------------|--------------------------|
| 声明方式            | `sealed class`            | `sealed interface`       |
| 实现方式            | 继承                      | 实现                     |
| 多继承              | 不支持                    | 支持                     |
| 状态存储            | 可以                      | 不可以                   |
| 默认实现            | 可以有                    | 不能有                   |
| 实例化              | 不能直接实例化            | 不能直接实例化           |

### 组合使用示例

```kotlin
sealed interface Animal
sealed class Pet : Animal {
    abstract val name: String
}

data class Dog(override val name: String, val breed: String) : Pet()
data class Cat(override val name: String, val color: String) : Pet()
object Lion : Animal
```

## 实际应用场景

### 1. UI 状态管理

```kotlin
sealed class LoginState {
    object Idle : LoginState()
    object Loading : LoginState()
    data class Success(val user: User) : LoginState()
    data class Error(val message: String) : LoginState()
}

fun render(state: LoginState) = when(state) {
    LoginState.Idle -> showLoginForm()
    LoginState.Loading -> showProgressBar()
    is LoginState.Success -> showUserProfile(state.user)
    is LoginState.Error -> showErrorMessage(state.message)
}
```

### 2. 表达式解析

```kotlin
sealed class Expr {
    data class Const(val number: Double) : Expr()
    data class Sum(val e1: Expr, val e2: Expr) : Expr()
    object NotANumber : Expr()
}

fun eval(expr: Expr): Double = when(expr) {
    is Expr.Const -> expr.number
    is Expr.Sum -> eval(expr.e1) + eval(expr.e2)
    Expr.NotANumber -> Double.NaN
}
```

### 3. 网络请求结果处理

```kotlin
sealed interface ApiResult<out T> {
    data class Success<T>(val data: T) : ApiResult<T>
    sealed interface Failure : ApiResult<Nothing> {
        data class HttpError(val code: Int, val body: String?) : Failure
        data class NetworkError(val error: Throwable) : Failure
    }
}
```

## 优势与最佳实践

### 主要优势

1. **类型安全**：编译器知道所有可能的子类型
2. **消除无效状态**：避免出现未处理的类型
3. **减少错误**：强制处理所有可能情况
4. **代码清晰**：明确表达有限的可能性

### 最佳实践

1. **优先用于有限且固定的类型集合**
2. **与 `when` 表达式结合使用**
3. **避免过度复杂的层次结构**
4. **在模块边界处使用**（如仓库层返回结果）
5. **考虑性能**：密封类比枚举占用更多内存

## 与枚举类的比较

| 特性                | 枚举类                     | 密封类                     |
|---------------------|---------------------------|---------------------------|
| 实例数量            | 固定                      | 可动态创建                 |
| 实例状态            | 无状态（单例）            | 可以有状态                 |
| 类型关系            | 都是同一类型              | 可以是不同类型             |
| 使用场景            | 简单的固定值集合          | 复杂的、有状态的类型层次    |
| 性能                | 更高                      | 稍低                       |

```kotlin
// 枚举实现
enum class ResultType { SUCCESS, ERROR, LOADING }

// 密封类实现更灵活
sealed class Result<T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Error<T>(val error: Exception) : Result<T>()
    object Loading : Result<Nothing>()
}
```

密封类和密封接口是 Kotlin 类型系统中非常强大的工具，特别适合需要精确控制类型层次结构和处理所有可能情况的场景。