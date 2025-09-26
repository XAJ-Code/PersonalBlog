# 现代 C# 推荐的多线程实现方案，涵盖从基础到高级的用法：

### **1. 最简方案：`Task.Run`（推荐）**
适用于大多数场景，底层自动使用线程池，避免手动管理线程。
```csharp
// 启动一个后台线程执行任务
Task.Run(() =>
{
    Console.WriteLine($"线程ID: {Environment.CurrentManagedThreadId}");
    // 执行耗时操作（如计算、IO等）
    Thread.Sleep(1000); 
    Console.WriteLine("任务完成");
});

// 主线程继续执行其他代码
Console.WriteLine("主线程未阻塞");
```
**优点**：自动管理线程生命周期，适合短期任务。

---

### **2. 传统方式：`Thread` 类**
需要精细控制线程时使用（如设置优先级、命名线程等）。
```csharp
using System.Threading;

// 创建线程并指定执行的方法
Thread workerThread = new Thread(() =>
{
    Console.WriteLine($"线程ID: {Thread.CurrentThread.ManagedThreadId}");
    Thread.Sleep(2000);
    Console.WriteLine("传统线程任务完成");
})
{
    Name = "MyWorkerThread",      // 线程命名（调试时有用）
    Priority = ThreadPriority.Normal, // 设置优先级
    IsBackground = true           // 设为后台线程（主线程退出时自动终止）
};

workerThread.Start(); // 启动线程
```
**适用场景**：长期运行的任务（如 Socket 监听）。

---

### **3. 异步编程：`async/await` + `Task`**
现代 C# 首选模式，避免阻塞主线程（如 UI 线程）。
```csharp
async Task DoWorkAsync()
{
    Console.WriteLine("主线程ID: " + Environment.CurrentManagedThreadId);
    
    await Task.Run(() => 
    {
        Console.WriteLine("工作线程ID: " + Environment.CurrentManagedThreadId);
        Thread.Sleep(1000); // 模拟耗时操作
    });
    
    Console.WriteLine("回到主线程ID: " + Environment.CurrentManagedThreadId);
}

// 调用
await DoWorkAsync(); // 需在 async 方法中调用
```
**优势**：代码线性可读，自动处理线程上下文切换（如回到UI线程）。

---

### **4. 高级控制：`TaskFactory` + `CancellationToken`**
支持取消、超时和复杂任务调度。
```csharp
using System.Threading.Tasks;
using System.Threading;

var cts = new CancellationTokenSource();

// 启动可取消的任务
var task = Task.Factory.StartNew(() =>
{
    while (!cts.Token.IsCancellationRequested)
    {
        Console.WriteLine("正在运行...");
        Thread.Sleep(500);
    }
}, cts.Token, TaskCreationOptions.LongRunning, TaskScheduler.Default);

// 5秒后取消任务
await Task.Delay(5000);
cts.Cancel();

try { await task; }
catch (TaskCanceledException) { Console.WriteLine("任务已取消"); }
```
**适用场景**：需要取消支持的后台任务。

---

### **5. 并行处理：`Parallel` 类**
针对数据并行优化（如循环处理大量数据）。
```csharp
Parallel.For(0, 10, i =>
{
    Console.WriteLine($"并行处理 {i}, 线程ID: {Thread.CurrentThread.ManagedThreadId}");
});
```
**输出特点**：多个线程并行执行，顺序不确定。

---

### **6. 线程安全注意事项**
#### **(1) 跨线程访问 UI 控件**
在 WinForms/WPF 中，非UI线程不能直接操作控件，需通过 `Invoke`：
```csharp
// WinForms 示例
this.Invoke(() => label1.Text = "更新文本");

// WPF 示例
Dispatcher.Invoke(() => textBox1.Text = "Hello");
```

#### **(2) 共享数据同步**
使用 `lock` 或线程安全集合：
```csharp
private static readonly object _lockObj = new object();
private int _counter = 0;

void Increment()
{
    lock (_lockObj)
    {
        _counter++; // 确保原子操作
    }
}
```

---

### **7. 各方案对比总结**
| **方案**          | **优点**                          | **缺点**                  | **适用场景**               |
|-------------------|----------------------------------|--------------------------|---------------------------|
| `Task.Run`        | 简单、自动线程池管理             | 不适合长期运行任务        | 短期计算/IO任务            |
| `Thread`         | 精细控制线程参数                 | 手动管理资源              | 长期运行或特殊需求         |
| `async/await`    | 代码清晰，避免回调地狱           | 需理解状态机机制          | UI应用、网络请求           |
| `Parallel`       | 自动并行化循环                   | 不适用非均匀任务          | 数据并行处理               |
| `TaskFactory`    | 支持高级调度和取消               | 配置复杂                  | 需要取消/超时的后台任务    |

---

### **代码模板：完整线程示例**
```csharp
using System;
using System.Threading;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        Console.WriteLine($"主线程ID: {Thread.CurrentThread.ManagedThreadId}");

        // 方案1: Task.Run
        var task = Task.Run(() => 
        {
            Console.WriteLine($"Task.Run线程ID: {Thread.CurrentThread.ManagedThreadId}");
            Thread.Sleep(1000);
            return "结果";
        });

        // 方案2: 传统Thread
        var thread = new Thread(() => 
        {
            Console.WriteLine($"Thread线程ID: {Thread.CurrentThread.ManagedThreadId}");
            Thread.Sleep(800);
        }) { IsBackground = true };
        thread.Start();

        // 等待任务完成
        Console.WriteLine(await task);
        thread.Join();

        Console.WriteLine("所有线程结束");
    }
}
```

---

### **最终建议**
- **优先选择 `Task.Run` + `async/await`**：适用于 90% 的异步场景。
- **需要精细控制时用 `Thread`**：如设置线程优先级或命名。
- **避免直接 `new Thread`**：除非明确需要独占线程资源。