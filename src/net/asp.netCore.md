# ASP.NET Core 概述

## 🌟 什么是 ASP.NET Core？

ASP.NET Core 是一个开源的、跨平台的、高性能的 Web 框架，用于构建现代化的云原生 Web 应用程序、API、微服务和实时应用。

```csharp
public class Middleware2
{
    private readonly RequestDelegate _next;

    public Middleware2(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext httpContext)
    {
        await httpContext.Response.WriteAsync("我是第三个中间件\n");
        await _next.Invoke(httpContext);
        await httpContext.Response.WriteAsync("我是第三个中间件返回执行的\n");
    }
}
// 自定义的扩展，用来在入口文件注入自定义中间件
public static class Middleware2Extensions
{
    public static IApplicationBuilder UseMiddleware2(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<Middleware2>();
    }
}
```

## 🏗️ 架构层次关系

### 技术栈类比
| 层级 | ASP.NET Core 体系 | 对应 Node.js 体系 | 说明 |
|------|------------------|------------------|------|
| **应用框架** | ASP.NET Core | Express.js/Koa | Web 开发框架 |
| **运行时** | .NET Runtime | Node.js Runtime | 代码执行环境 |
| **基础库** | .NET Base Class Library | Node.js Standard Library | 基础功能库 |
| **跨平台层** | .NET Platform Abstraction | libuv | 平台抽象层 |
| **操作系统** | Windows/Linux/macOS | Windows/Linux/macOS | 底层操作系统 |

### 架构图示
```
┌─────────────────────────────────────────────────┐
│                ASP.NET Core Application         │
│   ┌─────────────┐ ┌─────────────┐ ┌───────────┐ │
│   │   MVC       │ │   Web API   │ │  Blazor   │ │
│   └─────────────┘ └─────────────┘ └───────────┘ │
├─────────────────────────────────────────────────┤
│               ASP.NET Core Framework            │
│   ┌─────────────┐ ┌─────────────┐ ┌───────────┐ │
│   │ Middleware  │ │ Dependency  │ │ Routing   │ │
│   │ Pipeline    │ │ Injection   │ │ System    │ │
│   └─────────────┘ └─────────────┘ └───────────┘ │
├─────────────────────────────────────────────────┤
│                .NET Platform                    │
│   ┌─────────────┐ ┌─────────────┐ ┌───────────┐ │
│   │ .NET Runtime│ │ Base Class  │ │  Languages│ │
│   │ (CLR)       │ │ Library     │ │ (C#/F#)   │ │
│   └─────────────┘ └─────────────┘ └───────────┘ │
├─────────────────────────────────────────────────┤
│               Operating System                  │
│   ┌─────────────┐ ┌─────────────┐ ┌───────────┐ │
│   │ Windows     │ │ Linux       │ │ macOS     │ │
│   └─────────────┘ └─────────────┘ └───────────┘ │
└─────────────────────────────────────────────────┘
```

## 🔧 核心特性

### 1. 跨平台支持
```csharp
// 可在 Windows、Linux、macOS 上运行
// 基于 .NET 的跨平台能力实现
```

### 2. 高性能
- 优化的 HTTP 处理管道
- 内置依赖注入容器
- 编译为本地代码的能力 (AOT)

### 3. 模块化中间件系统
```csharp
// 类似 Express 的中间件模式
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.UseEndpoints(endpoints => {
    endpoints.MapControllers();
});
```

### 4. 统一的编程模型
```csharp
// Web MVC、Web API、Razor Pages 统一框架
public class UserController : Controller
{
    [HttpGet] // Web API
    public IActionResult GetUsers() { /* ... */ }
    
    [HttpPost] // MVC Action
    public IActionResult CreateUser() { /* ... */ }
}
```

## 📊 与传统 ASP.NET 的区别

| 特性 | ASP.NET Core | 传统 ASP.NET |
|------|-------------|-------------|
| **跨平台** | ✅ 支持 | ❌ 仅 Windows |
| **开源** | ✅ MIT 协议 | ❌ 闭源 |
| **性能** | ⭐️ 高性能 | 🔶 中等性能 |
| **部署** | 自包含部署 | 依赖 IIS |
| **配置** | appsettings.json | Web.config |

## 🚀 主要应用场景

### 1. Web API 开发
```csharp
// 构建 RESTful API
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    [HttpGet]
    public IEnumerable<Product> Get() => _repository.GetProducts();
}
```

### 2. MVC Web 应用
```csharp
// 传统的 MVC 模式
public class HomeController : Controller
{
    public IActionResult Index() => View();
}
```

### 3. 实时应用
```csharp
// 使用 SignalR 构建实时功能
public class ChatHub : Hub
{
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}
```

### 4. 微服务架构
```csharp
// 轻量级、可扩展的微服务
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
var app = builder.Build();
app.MapControllers();
app.Run();
```

## 🔄 开发工作流

### 项目创建
```bash
# 创建新项目
dotnet new webapi -n MyWebApi
dotnet new mvc -n MyWebApp
```

### 依赖管理
```xml
<!-- Project.csproj -->
<Project Sdk="Microsoft.NET.Sdk.Web">
  <ItemGroup>
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="7.0.0" />
    <PackageReference Include="Swashbuckle.AspNetCore" Version="6.0.0" />
  </ItemGroup>
</Project>
```

### 运行和部署
```bash
# 开发运行
dotnet run

# 发布部署
dotnet publish -c Release

# Docker 部署
docker build -t myapp .
docker run -p 8080:80 myapp
```

## 🌐 生态系统

### 核心组件
- **Entity Framework Core**: ORM 框架
- **Identity Core**: 身份认证系统
- **SignalR**: 实时通信库
- **Blazor**: WebAssembly 前端框架

### 集成能力
- **Docker**: 容器化支持
- **Kubernetes**: 云原生部署
- **Azure**: 云平台集成
- **各种数据库**: SQL Server、PostgreSQL、MySQL等

## 💡 总结

ASP.NET Core 是建立在 .NET 平台之上的现代 Web 框架，它：

1. **基于 .NET 平台**：利用 .NET 的跨平台能力和性能优势
2. **模块化设计**：类似 Express 的中间件管道架构
3. **高性能**：为云原生应用优化
4. **统一模型**：支持多种开发模式（MVC、API、Razor Pages）
5. **生态系统丰富**：强大的工具链和社区支持

正如 Express.js 是 Node.js 生态中的主流 Web 框架，ASP.NET Core 是 .NET 生态中构建现代 Web 应用的**首选框架**，两者都在各自平台上提供了类似的抽象层次和开发体验。