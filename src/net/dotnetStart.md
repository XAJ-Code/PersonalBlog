# .NET 简介

### 一、.NET5 和.NET Farmwork 和.NET Core 的区别

1.2006 年之前用的都是.NET Farmwork，不支持跨平台，慢慢的微软推出了.NET core1.0 版本支持跨平台，那时候就有两个产品线（.NET Farmwork 和.NET core）,直到 2016 年微软放弃了.NET Farmwork，推出了.NET5，就只有这一个产品线了，直到现在的.NET9

2. .NET CORE 也就是.NET5 支持跨平台的底层原理就是，CLI(公共语言编译框架)和 CLR(公共语言运行框架)，我们写的 c#语言首先被 CLI 编译成 IL(中间语言)，微软推出的类似于汇编语言，然后呢再通过 CLR 来根据运行的平台运行编译为机器码，来实现跨平台
3. 所以.NET Core === CLI + CLR

```C#
namespace HelloWord
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //输出到控制台--换行
            Console.WriteLine("Hello, .NET Core!");
            //不换行
            Console.Write("Wellcome to .NET Core!");
            Console.WriteLine("-------------------------------");
            Console.Clear();
            //读取控制台输入
            var a = Console.ReadLine();
            Console.WriteLine(a);
            ConsoleKeyInfo b = Console.ReadKey();
            Console.WriteLine(b.Key);

            //基本数据类型
            //整型
            //byte, sbyte, short, ushort, int, uint, long, ulong;
            //区别:byte和sbyte是8位，short和ushort是16位，int和uint是32位，long和ulong是64位,u是无符号的,也就是不带负号的
            //浮点型
            //float, double, decimal;
            //区别:float是32位，double是64位，decimal是128位，decimal精度更高，适合财务计算
            //float和double是浮点数,单精度和双精度的区别就是精度不同
            //比如说float是3.4E+38,也就是3.4*10的38次方，double是1.7E+308,也就是1.7*10的308次方

            string str = "Hello, World!";
            String str2 = "Hello, World!";
            //字符串是引用类型,所以可以用String来表示,str和String是一样的
            //字符串是不可变的,也就是一旦创建就不能修改了,如果要修改,就会创建一个新的字符串
            //字符串显示变量
            string name = "张三";
            int age = 18;
            string str3 = $"我的名字是{name},今年{age}岁";
            Console.WriteLine($"你好{str2}");

            var ccc = name.ToUpper();
            Console.WriteLine(ccc);

        }
    }
}

```
### 二、static 关键字
1. static修饰符，属于类型而非实例​​：静态成员属于类本身，而不是类的实例。这意味着即使没有创建类的实例，也可以访问静态成员
2. static修饰的成员，属于类本身，不属于任何实例，所以static修饰的成员，只能通过类名访问，不能通过实例访问，没有实例化的概念

## 2.1. static应用场景
1. ​​共享数据：计数器、ID生成器，缓存数据等
2. ​​工具类：字符串处理工具，数学计算工具（如Math类）

## 2.2. this和base关键字
1. this关键字：指代当前对象(当前类的实例对象)，在静态方法中，this指代的是当前类
2. base关键字：指代当前类的基类，在静态方法中，base指代的是基类