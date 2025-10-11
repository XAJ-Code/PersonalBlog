# C# 继承中的方法重写(override)与隐藏(new)完全指南

## 目录
- #核心概念对比
- #详细技术分析
- #实际应用示例
- #内存模型与绑定机制
- #最佳实践与常见误区
- #总结

## 核心概念对比

### 基本定义
- **`override` (重写)**：真正的多态实现，运行时根据实际对象类型决定调用哪个方法
- **`new` (隐藏)**：创建与基类方法无关的新方法，编译时根据引用类型决定调用

### 快速对比表

| 特性 | `override` | `new` |
|------|------------|--------|
| **多态性** | 运行时多态 | 无真正多态 |
| **绑定时机** | 运行时绑定 | 编译时绑定 |
| **基类要求** | `virtual`/`abstract` | 任何可访问方法 |
| **设计意图** | 改变行为，实现多态 | 提供不同实现 |
| **方法关系** | 替代关系 | 平行关系 |

## 详细技术分析

### 语法规范

```csharp
public class BaseClass
{
    // 虚方法 - 可被重写
    public virtual void VirtualMethod() => Console.WriteLine("Base Virtual");
    
    // 普通方法 - 可被隐藏
    public void NormalMethod() => Console.WriteLine("Base Normal");
    
    // 抽象方法 - 必须被重写
    public abstract void AbstractMethod();
}

public class DerivedClass : BaseClass
{
    // 重写虚方法
    public override void VirtualMethod() => Console.WriteLine("Derived Override");
    
    // 隐藏普通方法
    public new void NormalMethod() => Console.WriteLine("Derived New");
    
    // 实现抽象方法（本质也是重写）
    public override void AbstractMethod() => Console.WriteLine("Implemented Abstract");
}
```

### 调用行为分析

```csharp
// 测试代码
BaseClass obj = new DerivedClass();

// 虚方法 - 运行时多态
obj.VirtualMethod();    // 输出："Derived Override"

// 普通方法 - 编译时绑定  
obj.NormalMethod();     // 输出："Base Normal"

// 直接使用派生类引用
DerivedClass derivedObj = new DerivedClass();
derivedObj.NormalMethod();  // 输出："Derived New"
```

## 实际应用示例

### 适合使用 override 的场景

**游戏开发中的多态系统**
```csharp
public abstract class GameEntity
{
    public virtual void Update() 
    {
        Console.WriteLine("Base entity update");
    }
    
    public virtual void Render() 
    {
        Console.WriteLine("Rendering base entity");
    }
}

public class Player : GameEntity
{
    public override void Update() 
    {
        Console.WriteLine("Updating player logic");
        base.Update();  // 可选调用基类实现
    }
    
    public override void Render() 
    {
        Console.WriteLine("Rendering player model");
    }
}

public class Enemy : GameEntity
{
    public override void Update() 
    {
        Console.WriteLine("Updating enemy AI");
    }
}

// 多态调用
List<GameEntity> entities = new List<GameEntity> { new Player(), new Enemy() };
foreach (var entity in entities)
{
    entity.Update();  // 各自调用正确的更新逻辑
}
```

### 适合使用 new 的场景

**框架扩展与兼容性**
```csharp
public class LegacyDataProcessor
{
    public void ProcessData(string data)
    {
        Console.WriteLine($"Legacy processing: {data}");
    }
}

public class EnhancedDataProcessor : LegacyDataProcessor
{
    // 使用 new 提供增强实现，不影响现有代码
    public new void ProcessData(string data)
    {
        Console.WriteLine("Pre-processing data...");
        base.ProcessData(data);  // 复用基类逻辑
        Console.WriteLine("Post-processing data...");
    }
    
    // 新增功能
    public new void ProcessData(string data, string format)
    {
        Console.WriteLine($"Processing {data} with format {format}");
    }
}

// 现有代码继续正常工作
LegacyDataProcessor processor = new EnhancedDataProcessor();
processor.ProcessData("test");  // 输出："Legacy processing: test"
```

## 内存模型与绑定机制

### 虚方法表(VTable)机制

```csharp
public class Animal
{
    public virtual void Speak() => Console.WriteLine("Animal sound");
    public void Eat() => Console.WriteLine("Eating");
}

public class Dog : Animal
{
    public override void Speak() => Console.WriteLine("Woof!");
    public new void Eat() => Console.WriteLine("Dog eating");
}

// 内存布局概念
Animal animal = new Dog();
```

**虚方法表结构：**
```
Animal VTable:
┌─────────────────┐
│ Speak → Animal.Speak │
│ Eat   → Animal.Eat   │
└─────────────────┘

Dog VTable:
┌─────────────────┐
│ Speak → Dog.Speak    │  // override 替换了槽位
│ Eat   → Animal.Eat   │  // new 不影响基类槽位
│ [新增] Dog.Eat       │  // new 方法作为独立入口
└─────────────────┘
```

### 绑定过程分析

```csharp
Animal myDog = new Dog();

// 虚方法调用过程：
// 1. 找到实际对象类型 (Dog)
// 2. 查找 Dog 的虚方法表
// 3. 调用 Speak 槽位指向的方法 → Dog.Speak()

// 普通方法调用过程：
// 1. 查看编译时类型 (Animal) 
// 2. 直接调用 Animal.Eat()
```

## 高级主题

### 属性重写与隐藏

```csharp
public class Configuration
{
    public virtual string ConnectionString => "Default Connection";
    public string Version => "1.0";
}

public class CustomConfiguration : Configuration
{
    public override string ConnectionString => "Custom Connection";
    public new string Version => "2.0";
}

// 使用
Configuration config = new CustomConfiguration();
Console.WriteLine(config.ConnectionString);  // "Custom Connection" (重写)
Console.WriteLine(config.Version);           // "1.0" (隐藏)
```

### 密封重写(Sealed Override)

```csharp
public class Base
{
    public virtual void Method() => Console.WriteLine("Base");
}

public class Derived : Base
{
    public sealed override void Method() => Console.WriteLine("Derived");
}

public class FurtherDerived : Derived
{
    // 编译错误：不能重写密封方法
    // public override void Method() { }
}
```

## 最佳实践与常见误区

### ✅ 推荐做法

**1. 明确表明意图**
```csharp
// ✅ 好的做法
public new void Method() { }  // 明确使用 new

// ❌ 避免隐式隐藏（会产生编译器警告）
public void Method() { }      // 警告 CS0108
```

**2. 优先使用 override 实现多态**
```csharp
public abstract class Shape
{
    public abstract double Area { get; }  // 强制派生类实现
}

public class Circle : Shape
{
    private double _radius;
    public override double Area => Math.PI * _radius * _radius;
}
```

### ❌ 常见误区

**误区1：误以为 new 也有多态**
```csharp
Base obj = new Derived();
obj.Method();  // 如果 Method 是 new 隐藏，调用的是 Base.Method()

// ✅ 正确理解：只有 override 才有运行时多态
```

**误区2：不必要的隐藏**
```csharp
// ❌ 不推荐：无意义的隐藏
public class Logger
{
    public void Log(string message) { }
}

public class FileLogger : Logger
{
    public new void Log(string message)  // 为什么隐藏？应该用 override 或保持原样
    {
        // 相同语义的方法不应该隐藏
    }
}
```

## 总结

### 核心要点回顾

1. **`override` 用于多态**：当需要在继承体系中改变方法行为时使用
2. **`new` 用于隐藏**：当需要提供完全不同实现且不影响现有代码时使用
3. **绑定机制不同**：`override` 是运行时绑定，`new` 是编译时绑定
4. **设计意图明确**：根据实际需求选择合适的关键字

### 选择指南

| 场景 | 推荐选择 |
|------|----------|
| 实现多态行为 | `override` |
| 扩展第三方库 | `new` |
| 改变方法语义 | `new` |
| 保持接口一致性 | `override` |
| 版本兼容性需求 | `new` |