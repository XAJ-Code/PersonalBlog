# C# 委托(Delegate)详解

## 什么是委托？

委托是C#中的一种**类型安全的函数指针**，它允许你将方法作为参数传递，或者将方法存储在变量中。简单来说，**委托就是方法的"容器"，它封装了方法的调用，使得方法可以像对象一样被传递和调用**。

## 委托的基本语法

### 1. 声明委托类型

```csharp
// 声明一个委托类型，定义方法的签名
delegate int MathOperation(int a, int b);
```

### 2. 使用委托

```csharp
class Calculator
{
    // 匹配委托签名的方法
    public static int Add(int a, int b) => a + b;
    public static int Subtract(int a, int b) => a - b;
    public static int Multiply(int a, int b) => a * b;
}

class Program
{
    static void Main()
    {
        // 创建委托实例
        MathOperation operation = Calculator.Add;
        
        // 调用委托
        int result = operation(10, 5);  // 结果为15
        Console.WriteLine($"10 + 5 = {result}");
        
        // 更换委托指向的方法
        operation = Calculator.Subtract;
        result = operation(10, 5);     // 结果为5
        Console.WriteLine($"10 - 5 = {result}");
    }
}
```

## 内置泛型委托

C#提供了几个常用的内置委托，避免了手动声明委托类型。

### 1. Action委托（无返回值）

```csharp
// Action：无参数，无返回值
Action simpleAction = () => Console.WriteLine("Hello!");

// Action<T>：有参数，无返回值
Action<string> printAction = message => Console.WriteLine($"消息：{message}");

// Action<T1, T2>：多个参数
Action<string, int> printDetails = (name, age) => 
    Console.WriteLine($"姓名：{name}，年龄：{age}");

// 使用示例
printAction("欢迎学习委托！");
printDetails("张三", 25);
```

### 2. Func委托（有返回值）

```csharp
// Func<TResult>：无参数，有返回值
Func<int> getRandom = () => new Random().Next(1, 100);

// Func<T, TResult>：一个参数，有返回值
Func<int, bool> isEven = num => num % 2 == 0;

// Func<T1, T2, TResult>：多个参数，有返回值
Func<int, int, int> add = (a, b) => a + b;

// 使用示例
Console.WriteLine($"随机数：{getRandom()}");
Console.WriteLine($"10是偶数吗？{isEven(10)}");
Console.WriteLine($"5 + 3 = {add(5, 3)}");
```

### 3. Predicate委托（返回bool）

```csharp
// 主要用于集合的筛选条件
Predicate<int> isPositive = num => num > 0;

List<int> numbers = new List<int> { -2, -1, 0, 1, 2 };
var positiveNumbers = numbers.FindAll(isPositive);

Console.WriteLine("正数：" + string.Join(", ", positiveNumbers));
```

## 多播委托

委托可以包含多个方法，形成调用链：

```csharp
delegate void NotificationDelegate(string message);

class NotificationSystem
{
    public static void EmailNotify(string message)
    {
        Console.WriteLine($"📧 发送邮件：{message}");
    }
    
    public static void SmsNotify(string message)
    {
        Console.WriteLine($"📱 发送短信：{message}");
    }
    
    public static void PushNotify(string message)
    {
        Console.WriteLine($"🔔 推送通知：{message}");
    }
}

class Program
{
    static void Main()
    {
        NotificationDelegate notifier = NotificationSystem.EmailNotify;
        
        // 添加多个方法（多播）
        notifier += NotificationSystem.SmsNotify;
        notifier += NotificationSystem.PushNotify;
        
        Console.WriteLine("=== 发送所有通知 ===");
        notifier("系统维护通知");
        
        Console.WriteLine("\n=== 移除邮件通知后 ===");
        notifier -= NotificationSystem.EmailNotify;
        notifier("系统更新完成");
    }
}
```

**输出结果：**
```
=== 发送所有通知 ===
📧 发送邮件：系统维护通知
📱 发送短信：系统维护通知
🔔 推送通知：系统维护通知

=== 移除邮件通知后 ===
📱 发送短信：系统更新完成
🔔 推送通知：系统更新完成
```

## 匿名方法和Lambda表达式

### 1. 匿名方法

```csharp
// 传统方式
Func<int, int> square = delegate(int x) 
{ 
    return x * x; 
};

// 使用匿名方法
Func<int, int, int> multiply = delegate(int a, int b)
{
    return a * b;
};
```

### 2. Lambda表达式（推荐）

```csharp
// 基本Lambda表达式
Func<int, int> square = x => x * x;

// 多参数Lambda
Func<int, int, int> add = (a, b) => a + b;

// 多语句Lambda
Func<int, int, string> format = (a, b) =>
{
    int sum = a + b;
    return $"{a} + {b} = {sum}";
};

Console.WriteLine(square(5));        // 25
Console.WriteLine(add(3, 4));        // 7
Console.WriteLine(format(2, 3));     // 2 + 3 = 5
```

## 实际应用案例

### 案例1：排序算法的灵活应用

```csharp
class Student
{
    public string Name { get; set; }
    public int Score { get; set; }
    public int Age { get; set; }
}

class Program
{
    static void SortStudents(List<Student> students, Comparison<Student> comparison)
    {
        students.Sort(comparison);
    }
    
    static void Main()
    {
        var students = new List<Student>
        {
            new Student { Name = "张三", Score = 85, Age = 20 },
            new Student { Name = "李四", Score = 92, Age = 19 },
            new Student { Name = "王五", Score = 78, Age = 21 }
        };
        
        // 按分数排序
        SortStudents(students, (s1, s2) => s2.Score.CompareTo(s1.Score));
        Console.WriteLine("按分数降序：");
        students.ForEach(s => Console.WriteLine($"{s.Name} - {s.Score}"));
        
        // 按年龄排序
        SortStudents(students, (s1, s2) => s1.Age.CompareTo(s2.Age));
        Console.WriteLine("\n按年龄升序：");
        students.ForEach(s => Console.WriteLine($"{s.Name} - {s.Age}"));
    }
}
```

### 案例2：回调机制

```csharp
class FileProcessor
{
    // 处理完成的回调委托
    public Action<string, bool> OnProcessingComplete { get; set; }
    
    public void ProcessFile(string filePath)
    {
        try
        {
            // 模拟文件处理
            Thread.Sleep(1000);
            Console.WriteLine($"处理文件：{filePath}");
            
            // 调用回调
            OnProcessingComplete?.Invoke(filePath, true);
        }
        catch
        {
            OnProcessingComplete?.Invoke(filePath, false);
        }
    }
}

class Program
{
    static void Main()
    {
        var processor = new FileProcessor();
        
        // 设置回调方法
        processor.OnProcessingComplete = (filePath, success) =>
        {
            string status = success ? "成功" : "失败";
            Console.WriteLine($"文件 {filePath} 处理{status}！");
            
            if (success)
            {
                // 处理成功后的额外操作
                Console.WriteLine("发送处理完成通知...");
            }
        };
        
        processor.ProcessFile("document.txt");
    }
}
```

### 案例3：事件系统的基础

```csharp
class Button
{
    // 事件基于委托
    public event Action<string> OnClick;
    
    public void Click()
    {
        Console.WriteLine("按钮被点击了！");
        OnClick?.Invoke(DateTime.Now.ToString());
    }
}

class Logger
{
    public static void Log(string message)
    {
        Console.WriteLine($"[日志] {DateTime.Now}: {message}");
    }
}

class Program
{
    static void Main()
    {
        var button = new Button();
        
        // 订阅事件
        button.OnClick += message => Console.WriteLine($"点击时间：{message}");
        button.OnClick += message => Logger.Log($"按钮点击 - {message}");
        
        // 模拟点击
        button.Click();
    }
}
```

## 委托的注意事项

### 1. 异常处理

```csharp
Action riskyOperation = () => throw new Exception("出错了！");

// 安全的委托调用方式
try
{
    riskyOperation?.Invoke();
}
catch (Exception ex)
{
    Console.WriteLine($"捕获异常：{ex.Message}");
}
```

### 2. 多播委托的返回值

```csharp
Func<int> multiFunc = () => 1;
multiFunc += () => 2;
multiFunc += () => 3;

int result = multiFunc();  // 只返回最后一个方法的返回值：3
Console.WriteLine(result); // 输出：3
```

### 3. 内存管理

```csharp
class EventSource
{
    public event Action OnEvent;
}

class EventSubscriber
{
    public void HandleEvent() => Console.WriteLine("事件处理");
    
    public void Subscribe(EventSource source)
    {
        source.OnEvent += HandleEvent;
        
        // 重要：不再需要时要取消订阅
        // source.OnEvent -= HandleEvent;
    }
}
```

## 总结

委托是C#中强大的特性，它：
- ✅ 提供类型安全的方法引用
- ✅ 支持回调机制和事件模式
- ✅ 实现灵活的代码设计
- ✅ 是LINQ和异步编程的基础