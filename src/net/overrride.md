# C# 继承中的方法重写与隐藏

## 目录
- #基本概念
- #方法重写-override
- #方法隐藏-new
- #对比总结
- #实际应用场景
- #最佳实践

## 基本概念

在 C# 继承中，子类可以以两种方式改变从父类继承的方法行为：
- **重写 (Override)**：真正的多态行为，运行时根据实际对象类型调用方法
- **隐藏 (New)**：创建与父类方法无关的新方法，编译时根据引用类型决定调用哪个方法

## 方法重写 (Override)

### 语法要求

```csharp
// 基类：必须使用 virtual 或 abstract 关键字
public class Animal
{
    public virtual void Speak()
    {
        Console.WriteLine("Animal speaks");
    }
    
    public virtual string Name => "Animal";
}

// 派生类：使用 override 关键字
public class Dog : Animal
{
    public override void Speak()
    {
        Console.WriteLine("Dog barks");
    }
    
    public override string Name => "Dog";
}
```

### 虚方法 (Virtual Methods)

```csharp
public class Shape
{
    public virtual void Draw()
    {
        Console.WriteLine("Drawing a shape");
    }
    
    public virtual double Area => 0;
}

public class Circle : Shape
{
    private double _radius;
    
    public Circle(double radius) => _radius = radius;
    
    public override void Draw()
    {
        Console.WriteLine($"Drawing a circle with radius {_radius}");
    }
    
    public override double Area => Math.PI * _radius * _radius;
}
```

### 抽象方法 (Abstract Methods)

```csharp
public abstract class Vehicle
{
    // 抽象方法必须被重写
    public abstract void Start();
    
    // 虚方法可以被重写
    public virtual void Stop()
    {
        Console.WriteLine("Vehicle stopped");
    }
}

public class Car : Vehicle
{
    public override void Start()
    {
        Console.WriteLine("Car started with key");
    }
    
    public override void Stop()
    {
        Console.WriteLine("Car stopped with brakes");
    }
}
```

### 重写行为特点

```csharp
Animal myDog = new Dog();  // 编译时类型：Animal，运行时类型：Dog
myDog.Speak();  // 输出："Dog barks" - 运行时决定

Dog realDog = new Dog();
realDog.Speak();  // 输出："Dog barks"
```

## 方法隐藏 (New)

### 语法和使用

```csharp
public class BaseClass
{
    public void Method()
    {
        Console.WriteLine("Base method");
    }
}

public class DerivedClass : BaseClass
{
    // 使用 new 关键字隐藏基类方法
    public new void Method()
    {
        Console.WriteLine("Derived method");
    }
}
```

### 隐藏的行为特点

```csharp
BaseClass obj1 = new DerivedClass();
obj1.Method();  // 输出："Base method" - 编译时决定

DerivedClass obj2 = new DerivedClass();
obj2.Method();  // 输出："Derived method"
```

## 对比总结

### 行为对比示例

```csharp
public class Base
{
    public virtual void VirtualMethod() => Console.WriteLine("Base Virtual");
    public void NormalMethod() => Console.WriteLine("Base Normal");
}

public class Derived : Base
{
    public override void VirtualMethod() => Console.WriteLine("Derived Override");
    public new void NormalMethod() => Console.WriteLine("Derived New");
}

// 测试代码
Base baseRef = new Derived();

baseRef.VirtualMethod();  // 输出："Derived Override" (运行时多态)
baseRef.NormalMethod();   // 输出："Base Normal" (编译时绑定)

if (baseRef is Derived derived)
{
    derived.NormalMethod();  // 输出："Derived New"
}
```

### 对比表格

| 特性 | 重写 (Override) | 隐藏 (New) |
|------|------------------|------------|
| **关键字** | `override` | `new` |
| **基类要求** | `virtual` 或 `abstract` | 任何可访问方法 |
| **多态性** | 运行时多态 | 编译时绑定 |
| **方法调用** | 根据实际对象类型 | 根据引用类型 |
| **设计意图** | 改变行为，实现多态 | 提供不同实现，不改变基类行为 |
| **使用场景** | "是一个"关系，多态需求 | "有一个"关系，需要不同实现 |

## 实际应用场景

### 适合重写的场景

```csharp
// 游戏开发中的多态示例
public abstract class Character
{
    public virtual void Attack() => Console.WriteLine("Basic attack");
}

public class Warrior : Character
{
    public override void Attack() => Console.WriteLine("Warrior uses sword attack");
}

public class Mage : Character
{
    public override void Attack() => Console.WriteLine("Mage casts fireball");
}

// 使用多态
List<Character> party = new List<Character> { new Warrior(), new Mage() };
foreach (var character in party)
{
    character.Attack();  // 各自调用正确的攻击方法
}
```

### 适合隐藏的场景

```csharp
// 框架扩展示例
public class LegacyComponent
{
    public void Process() => Console.WriteLine("Legacy processing");
}

public class EnhancedComponent : LegacyComponent
{
    // 不希望影响现有使用基类的代码
    public new void Process()
    {
        Console.WriteLine("Enhanced processing");
        base.Process();  // 可以选择调用基类实现
    }
}

// 现有代码继续工作
LegacyComponent comp = new EnhancedComponent();
comp.Process();  // 仍然使用旧逻辑
```

## 高级主题

### 密封重写 (Sealed Override)

```csharp
public class Base
{
    public virtual void Method() { }
}

public class Derived : Base
{
    public sealed override void Method()  // 阻止进一步重写
    {
        // 实现
    }
}

public class FurtherDerived : Derived
{
    // 错误：不能重写密封方法
    // public override void Method() { }
}
```

### 属性重写和隐藏

```csharp
public class BaseClass
{
    public virtual string Name => "Base";
    public string Description => "Base Description";
}

public class DerivedClass : BaseClass
{
    public override string Name => "Derived";
    public new string Description => "Derived Description";
}
```

## 最佳实践

### 1. 优先使用重写
```csharp
// ✅ 推荐：使用重写实现多态
public abstract class PaymentProcessor
{
    public abstract void ProcessPayment(decimal amount);
}

// ❌ 避免：不必要地使用隐藏
public class CreditCardProcessor : PaymentProcessor
{
    public new void ProcessPayment(decimal amount)  // 应该用 override
    {
        // 实现
    }
}
```

### 2. 明确使用 new 关键字
```csharp
// ✅ 明确表明意图
public new void Method() { }

// ❌ 避免隐式隐藏（会产生编译器警告）
public void Method() { }  // 警告：隐藏继承的成员
```

### 3. 谨慎使用隐藏
```csharp
// 只在确实需要时使用隐藏
public class SpecializedCollection : List<string>
{
    // 有充分理由时才隐藏基类方法
    public new void Add(string item)
    {
        // 添加特殊逻辑
        base.Add(item);
    }
}
```

### 4. 文档说明
```csharp
public class CustomList : List<int>
{
    /// <summary>
    /// 添加元素，自动去重
    /// 注意：此方法隐藏了基类的 Add 方法
    /// </summary>
    public new void Add(int item)
    {
        if (!Contains(item))
            base.Add(item);
    }
}
```

## 总结

- **重写**用于实现真正的多态，是面向对象设计的核心
- **隐藏**应该谨慎使用，通常用于特殊情况下的兼容性需求
- 理解两者的区别对于设计可维护、可扩展的面向对象系统至关重要
- 在大多数情况下，应该优先考虑使用重写来实现多态行为