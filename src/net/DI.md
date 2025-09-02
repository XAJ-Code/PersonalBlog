# ASP.NET Core 依赖注入（DI）

## 1. 什么是依赖注入？

- 依赖注入（Dependency Injection, DI）是一种设计模式，用于实现控制反转（IoC），它允许将依赖对象的创建和管理从使用它们的类中分离出来。ASP.NET Core 内置了一个轻量级的、高性能的依赖注入容器。
- 在入口点（Program.cs）中，通过 `IServiceCollection` 注册服务，然后通过 `IServiceProvider` 解析服务。
- 通过builder对象注册服务，builder对象是IServiceCollection的扩展方法，它提供了许多方便的方法来注册服务。
- 在内部类中，通过构造函数注入服务。

### 核心概念：
- **依赖**：一个对象需要另一个对象来完成其工作
- **注入**：外部实体提供所需的依赖项
- **容器**：管理依赖项创建和生命周期的对象

## 2. 服务生命周期详解

### 2.1 Transient（瞬态服务）
**生命周期**：每次请求都会创建新实例

**特点**：
- 每次从服务容器请求时都会创建新实例
- 适合无状态、轻量级的服务
- 线程不安全，需自行处理并发

**使用场景**：
```csharp
// 工具类服务
public class CalculatorService
{
    public int Add(int a, int b) => a + b;
    public int Multiply(int a, int b) => a * b;
}

// 注册方式
builder.Services.AddTransient<ICalculatorService, CalculatorService>();
```

### 2.2 Scoped（作用域服务）
**生命周期**：在同一作用域（如HTTP请求）内共享实例

**特点**：
- 同一个HTTP请求内多次请求返回相同实例
- 不同请求获得不同实例
- 是ASP.NET Core中最常用的生命周期

**使用场景**：
```csharp
// 数据库上下文（最典型用法）
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
        : base(options) { }
    
    public DbSet<User> Users { get; set; }
}

// 注册方式
builder.Services.AddScoped<ApplicationDbContext>();

// 业务逻辑服务
public class OrderService
{
    private readonly ApplicationDbContext _context;
    
    public OrderService(ApplicationDbContext context)
    {
        _context = context;
    }
    
    public async Task CreateOrder(Order order)
    {
        _context.Orders.Add(order);
        await _context.SaveChangesAsync();
    }
}
```

### 2.3 Singleton（单例服务）
**生命周期**：整个应用程序生命周期内只有一个实例

**特点**：
- 第一次请求时创建，后续所有请求都使用同一实例
- 需要线程安全实现
- 应用程序关闭时销毁

**使用场景**：
```csharp
// 配置服务
public class AppConfigService
{
    public string ApiKey { get; }
    public string ConnectionString { get; }
    
    public AppConfigService(IConfiguration configuration)
    {
        ApiKey = configuration["ApiKey"];
        ConnectionString = configuration.GetConnectionString("Default");
    }
}

// 注册方式
builder.Services.AddSingleton<AppConfigService>();

// 缓存服务
public class MemoryCacheService
{
    private readonly ConcurrentDictionary<string, object> _cache = new();
    
    public void Set(string key, object value) => _cache[key] = value;
    
    public object Get(string key) => _cache.TryGetValue(key, out var value) ? value : null;
}

builder.Services.AddSingleton<IMemoryCacheService, MemoryCacheService>();
```

## 3. 服务注册方式

### 3.1 接口+实现类注册（推荐）
```csharp
public interface IEmailService
{
    Task SendEmailAsync(string to, string subject, string body);
}

public class EmailService : IEmailService
{
    public async Task SendEmailAsync(string to, string subject, string body)
    {
        // 发送邮件逻辑
    }
}

// 注册
builder.Services.AddScoped<IEmailService, EmailService>();
```

### 3.2 直接注册实现类
```csharp
public class LoggerService
{
    public void Log(string message) => Console.WriteLine(message);
}

// 注册
builder.Services.AddTransient<LoggerService>();
```

### 3.3 实例注册
```csharp
var configService = new ConfigService();
builder.Services.AddSingleton(configService);
```

### 3.4 工厂方法注册
```csharp
builder.Services.AddScoped<IService>(serviceProvider =>
{
    var otherService = serviceProvider.GetService<IOtherService>();
    return new ServiceImplementation(otherService);
});
```

## 4. 服务解析方式

### 4.1 构造函数注入（最常用）
```csharp
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ILogger<UserController> _logger;
    
    public UserController(IUserService userService, ILogger<UserController> logger)
    {
        _userService = userService;
        _logger = logger;
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
        var user = await _userService.GetUserByIdAsync(id);
        return Ok(user);
    }
}
```

### 4.2 方法注入
```csharp
public class ReportGenerator
{
    public void GenerateReport([FromServices] IExcelExportService exportService)
    {
        // 使用注入的服务
        exportService.ExportToExcel();
    }
}
```

### 4.3 手动解析（尽量避免）
```csharp
public class ManualService
{
    private readonly IServiceProvider _serviceProvider;
    
    public ManualService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }
    
    public void Process()
    {
        using var scope = _serviceProvider.CreateScope();
        var service = scope.ServiceProvider.GetService<IMyService>();
        service.DoSomething();
    }
}
```

## 5. 最佳实践

### 5.1 生命周期选择指南
| 场景 | 推荐生命周期 | 理由 |
|------|-------------|------|
| 数据库操作 | Scoped | 每个请求一个DbContext实例 |
| 工具类、Helper | Transient | 无状态，不需要共享 |
| 配置服务 | Singleton | 全局共享，线程安全 |
| 缓存服务 | Singleton | 全局共享，需要线程安全 |
| 邮件发送 | Transient | 无状态，可能涉及不同配置 |

### 5.2 避免常见陷阱

**陷阱1：Singleton 中注入 Scoped 服务**
```csharp
// ❌ 错误示例
public class BadSingletonService
{
    private readonly IScopedService _scopedService;
    
    public BadSingletonService(IScopedService scopedService)
    {
        _scopedService = scopedService; // 运行时错误！
    }
}
```

**陷阱2：未释放的资源**
```csharp
// ✅ 正确做法：实现 IDisposable
public class ResourceService : IDisposable
{
    private bool _disposed = false;
    
    public void Dispose()
    {
        if (!_disposed)
        {
            // 释放资源
            _disposed = true;
        }
    }
}
```

## 6. 高级主题

### 6.1 多个实现注册
```csharp
public interface IPaymentProcessor
{
    bool ProcessPayment(decimal amount);
}

public class AlipayProcessor : IPaymentProcessor { /* 实现 */ }
public class WechatPayProcessor : IPaymentProcessor { /* 实现 */ }

// 注册多个实现
builder.Services.AddTransient<IPaymentProcessor, AlipayProcessor>();
builder.Services.AddTransient<IPaymentProcessor, WechatPayProcessor>();

// 解析所有实现
public class PaymentService
{
    private readonly IEnumerable<IPaymentProcessor> _processors;
    
    public PaymentService(IEnumerable<IPaymentProcessor> processors)
    {
        _processors = processors;
    }
    
    public void ProcessAll(decimal amount)
    {
        foreach (var processor in _processors)
        {
            processor.ProcessPayment(amount);
        }
    }
}
```

### 6.2 选项模式（Options Pattern）
```csharp
// 配置类
public class SmtpSettings
{
    public string Host { get; set; }
    public int Port { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
}

// 注册配置
builder.Services.Configure<SmtpSettings>(builder.Configuration.GetSection("Smtp"));

// 使用配置
public class EmailService
{
    private readonly SmtpSettings _settings;
    
    public EmailService(IOptions<SmtpSettings> options)
    {
        _settings = options.Value;
    }
}
```

## 7. 调试和故障排除

### 7.1 检查服务注册
```csharp
// 在 Program.cs 中添加调试代码
var app = builder.Build();

// 检查特定服务是否注册
var serviceDescriptor = builder.Services.FirstOrDefault(s => s.ServiceType == typeof(IMyService));
    
if (serviceDescriptor != null)
{
    Console.WriteLine($"服务已注册: {serviceDescriptor.Lifetime}");
}
else
{
    Console.WriteLine("服务未注册");
}
```

### 7.2 常见错误解决方案
1. **"Unable to resolve service"**：确保服务已正确注册
2. **"Captive Dependency"**：避免在Singleton中使用Scoped服务
3. **内存泄漏**：确保实现了IDisposable的服务正确释放

## 8. 总结

ASP.NET Core 的依赖注入系统提供了强大而灵活的服务管理能力：

- **Transient**：适合无状态、轻量级服务
- **Scoped**：适合大多数业务逻辑和数据库操作
- **Singleton**：适合全局共享的配置和缓存服务

正确使用依赖注入可以提高代码的可测试性、可维护性和灵活性，是现代.NET应用程序开发的核心技术之一。

---

**推荐资源**：
- [ASP.NET Core 依赖注入官方文档](https://docs.microsoft.com/zh-cn/aspnet/core/fundamentals/dependency-injection)
- [NET 依赖注入最佳实践](https://docs.microsoft.com/zh-cn/dotnet/core/extensions/dependency-injection-best-practices)