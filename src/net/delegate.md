# C# 委托(Delegate)和事件详解

## 什么是委托？

委托是C#中的一种**类型安全的函数指针**，它允许你将方法作为参数传递，或者将方法存储在变量中。简单来说，**委托就是方法的"容器"，它封装了方法的调用，使得方法可以像对象一样被传递和调用**。
- 委托是一种数据类型，它可以指向一个方法，用于存储对方法的引用。
- 主要使用在事件处理、多播、回调等场景。就是作为参数传递给方法的函数，可以是静态方法，也可以是实例方法。难点就是方法的封装。
- 内置委托:action-面对无返回值的类型；func-有返回值的类型; predicate-一个参数返回布尔类型

## 什么是事件
事件(Event)是 C# 中一种特殊的委托类型，它实现了观察者设计模式，允许对象在特定动作发生时通知其他对象。对象之间的消息通讯
- EventHandler就是事件，官方提供的，其实就是一个委托，但是它是泛型的，泛型参数就是事件的参数类型
- 这个事件委托就是有两个参数，无返回值的委托，第一个参数是事件源(谁触发一般是this)，第二个参数是事件参数(这个参数是自定义的,继承EventArgs)
- 事件的使用场景：
    - 当一个对象需要通知其他对象时，可以使用事件。
    - 当一个对象需要接收其他对象的通知时，可以使用事件。
- event关键字用于声明事件，基于委托实现，相对于事件是委托的实例对象。只能在声明类中调用事件，其他对象绑定(订阅)

- 事件的使用场景：
    - 当一个对象需要通知其他对象时，可以使用事件。

### 事件的基本使用
```csharp

//触发事件(委托)传递的参数
public class MailEventArgs: EventArgs
{
    public string Content { get; set; } = string.Empty;
    
    public DateTime SendTime { get; set; }
}


public class Boss
{
    //public delegate void SendDelegate();//委托

    // public Action? Send;//内置委托
    public event EventHandler<MailEventArgs>? OnSendHandler;
    public string BossName { get; init; } = string.Empty;

    public void SendMail()
    {
        Console.WriteLine($"{BossName}开始发送邮件!");
        MailEventArgs mailEventArgs = new MailEventArgs()
        {
            Content = "10点开会",
            SendTime = DateTime.Now
        };
        if (OnSendHandler != null)
        {
            //调用事件
            OnSendHandler(this, mailEventArgs);
        }
    }
}

public class Bull
{
    public string BullName { get; set; }

    public void ReceiveMail(object? sender, MailEventArgs eventArgs)
    {
        Console.WriteLine($"{BullName}收到！-内容：{eventArgs.Content},时间:{eventArgs.SendTime}");
    }
}

Boss boss = new Boss()
{
    BossName = "张三大老板"
};

var bull1 = new Bull() { BullName = "张一" };
//多播委托
boss.OnSendHandler += bull1.ReceiveMail;//订阅事件

```

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

```csharp
//练习小测试
public class TestDelegate
{
    private delegate int MyDelegate(int a, int b); //委托，表示指向一个方法

    private static int MyFunction(int a, int b)
    {
        return a + b;
    }

    public TestDelegate()
    {
        MyDelegate myDelegate = MyFunction;
        //匿名方法
        MyDelegate myDelegate2 = delegate(int a, int b) { return a + b; };
        //lambda表达式--匿名方法的语法糖，不用定义类型，会自动适配委托定义的类型
        MyDelegate myDelegate3 = (a, b) => a + b;
        myDelegate.Invoke(1, 2);
    }

    public void TestMyDelegate()
    {
        //内置委托
        //action-面对无返回值的类型；func-有返回值的类型; predicate-一个参数返回布尔类型
        Action actionTest = () => Console.WriteLine("Hello World");
        actionTest.Invoke();
        Action<int, int> actionTest2 = (a, b) => Console.WriteLine($"{a}-{b}");//无返回值，有参数
        actionTest2.Invoke(5, 6);
        Func<int> funcTest = () => 10086;//func声明必须要有返回的类型，最后一个泛型就是返回的类型
        funcTest.Invoke();
        Func<int, int, int> funcTest2 = (a, b) => a + b;//最后一个泛型就是返回类型
        funcTest2.Invoke(1, 2);
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