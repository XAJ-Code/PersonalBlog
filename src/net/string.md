# C# 字符串(String)

## 1. 字符串概述

### 1.1 什么是字符串？
- 字符串是表示文本的字符序列
- 在C#中，字符串是`System.String`类的别名
- 字符串是**不可变(immutable)**的 - 一旦创建就不能修改

### 1.2 字符串特性
```csharp
// 字符串是不可变的
string str1 = "Hello";//字面量创建,保存到常量池中
str1 = str1 + " World"; // 创建了新字符串，原字符串未改变，保存到堆中

// 字符串是引用类型，但具有值类型的某些特性
string a = "hello";
string b = "hello";
bool isEqual = (a == b); // true - 值相等比较
//引用类型比较的是内存地址，值相等比较的是值
object.ReferenceEquals(a, b); //true
```

## 2. 字符串创建方式

### 2.1 直接赋值
```csharp
string str1 = "Hello World";
string str2 = "C#";
```

### 2.2 使用构造函数
```csharp
char[] letters = { 'H', 'e', 'l', 'l', 'o' };
string str3 = new string(letters); // "Hello"
string str4 = new string('*', 5);  // "*****"
```

### 2.3 字符串插值($)和逐字字符串(@)
```csharp
// 字符串插值
string name = "Alice";
int age = 25;
string message = $"姓名: {name}, 年龄: {age}";

// 逐字字符串（忽略转义字符）
string path = @"C:\Windows\System32";
string multiLine = @"第一行
第二行
第三行";
```

## 3. 常用字符串属性

### 3.1 基本属性
```csharp
string text = "Hello World";

// 获取字符串长度
int length = text.Length; // 11

// 检查是否为空或null
bool isEmpty = string.IsNullOrEmpty(text);     // false
bool isWhiteSpace = string.IsNullOrWhiteSpace("   "); // true
```

## 4. 字符串常用方法

### 4.1 查询和搜索方法

#### 4.1.1 索引和子字符串
```csharp
string text = "Hello World";

// 获取字符
char firstChar = text[0]; // 'H'

// 查找索引
int index1 = text.IndexOf('o');        // 4 - 第一个'o'的位置
int index2 = text.LastIndexOf('o');     // 7 - 最后一个'o'的位置
int index3 = text.IndexOf("World");     // 6 - 子字符串起始位置

// 检查包含关系
bool contains = text.Contains("Hello"); // true
```

#### 4.1.2 开头和结尾检查
```csharp
string fileName = "document.txt";

bool startsWith = fileName.StartsWith("doc");    // true
bool endsWith = fileName.EndsWith(".txt");       // true
```

### 4.2 字符串修改方法

#### 4.2.1 大小写转换
```csharp
string text = "Hello World";

string upper = text.ToUpper();  // "HELLO WORLD"
string lower = text.ToLower();  // "hello world"
```

#### 4.2.2 子字符串操作
```csharp
string text = "Hello World";

// 提取子字符串
string sub1 = text.Substring(6);      // "World" - 从索引6开始
string sub2 = text.Substring(0, 5);   // "Hello" - 从0开始取5个字符

// 移除字符
string removed = text.Remove(5);      // "Hello" - 移除索引5之后的所有字符
```

#### 4.2.3 插入和替换
```csharp
string text = "Hello World";

// 插入字符串
string inserted = text.Insert(5, " Beautiful"); // "Hello Beautiful World"

// 替换字符或字符串
string replaced1 = text.Replace('o', '0');     // "Hell0 W0rld"
string replaced2 = text.Replace("World", "C#"); // "Hello C#"
```

#### 4.2.4 修剪空白字符
```csharp
string text = "   Hello World   ";

string trimmedStart = text.TrimStart();    // "Hello World   "
string trimmedEnd = text.TrimEnd();        // "   Hello World"
string trimmed = text.Trim();              // "Hello World"
```

### 4.3 字符串分割和连接

#### 4.3.1 分割字符串
```csharp
string data = "apple,orange,banana,grape";

// 按字符分割
string[] fruits1 = data.Split(','); // ["apple", "orange", "banana", "grape"]

// 按字符串分割
string text = "Hello||World||CSharp";
string[] parts = text.Split(new[] { "||" }, StringSplitOptions.None);

// 移除空条目
string withSpaces = "a,,b,c, ,d";
string[] cleaned = withSpaces.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
```

#### 4.3.2 连接字符串
```csharp
string[] words = { "Hello", "World", "C#" };

// 使用Join方法
string joined1 = string.Join(" ", words);  // "Hello World C#"
string joined2 = string.Join("-", words);  // "Hello-World-C#"

// 使用Concat方法
string concated = string.Concat("Hello", " ", "World"); // "Hello World"
```

### 4.4 格式化方法

#### 4.4.1 字符串格式化
```csharp
// 使用string.Format
string formatted = string.Format("姓名: {0}, 年龄: {1}, 工资: {2:C}", "张三", 25, 5000);
// "姓名: 张三, 年龄: 25, 工资: ¥5,000.00"

// 使用插值字符串
decimal price = 99.99m;
DateTime now = DateTime.Now;
string message = $"价格: {price:C2}, 时间: {now:yyyy-MM-dd}";
```

#### 4.4.2 数字格式化
```csharp
int number = 12345;

string currency = number.ToString("C");    // "¥12,345.00"
string numberFormat = number.ToString("N"); // "12,345.00"
string hex = number.ToString("X");        // "3039" - 十六进制
```

## 5. 字符串比较

### 5.1 比较方法
```csharp
string str1 = "hello";
string str2 = "HELLO";
string str3 = "world";

// 相等比较
bool equal1 = str1 == str2;                   // false
bool equal2 = str1.Equals(str2);              // false
bool equal3 = string.Equals(str1, str2);     // false

// 大小写不敏感比较
bool ignoreCase = str1.Equals(str2, StringComparison.OrdinalIgnoreCase); // true

// 比较排序顺序
int result1 = string.Compare(str1, str2);                    // 1 (str1 > str2)
int result2 = string.Compare(str1, str2, StringComparison.OrdinalIgnoreCase); // 0
```

### 5.2 比较选项
```csharp
// 不同比较方式的性能和文化敏感性
StringComparison.Ordinal;           // 最快，二进制比较
StringComparison.OrdinalIgnoreCase; // 忽略大小写的二进制比较
StringComparison.CurrentCulture;    // 基于当前文化
StringComparison.InvariantCulture;  // 固定文化比较
```

## 6. StringBuilder类

### 6.1 为什么需要StringBuilder？
```csharp
// 低效的方式 - 创建多个临时字符串
string result = "";
for (int i = 0; i < 1000; i++)
{
    result += i.ToString(); // 每次循环创建新字符串！
}

// 高效的方式 - 使用StringBuilder
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++)
{
    sb.Append(i);
}
string finalResult = sb.ToString();
```

### 6.2 StringBuilder常用方法
```csharp
StringBuilder sb = new StringBuilder();

// 添加内容
sb.Append("Hello");
sb.AppendLine(" World");    // 添加并换行
sb.AppendFormat("数字: {0}", 42);

// 插入和删除
sb.Insert(5, " Beautiful"); // 在索引5处插入
sb.Remove(5, 10);          // 从索引5开始删除10个字符

// 容量管理
sb.Capacity = 1000;        // 设置初始容量
sb.EnsureCapacity(2000);   // 确保最小容量

string result = sb.ToString();
```

## 7. 字符串性能优化

### 7.1 避免字符串连接的性能问题
```csharp
// ❌ 避免 - 性能差
string sql = "SELECT * FROM Users";
sql += " WHERE Age > 18";
sql += " AND Name LIKE '%John%'";

// ✅ 推荐 - 使用StringBuilder
StringBuilder sqlBuilder = new StringBuilder();
sqlBuilder.Append("SELECT * FROM Users");
sqlBuilder.Append(" WHERE Age > 18");
sqlBuilder.Append(" AND Name LIKE '%John%'");
string finalSql = sqlBuilder.ToString();

// ✅ 或者使用字符串插值
int minAge = 18;
string nameFilter = "John";
string goodSql = $"SELECT * FROM Users WHERE Age > {minAge} AND Name LIKE '%{nameFilter}%'";
```

### 7.2 使用string.Intern减少内存
```csharp
// 字符串驻留 - 重用相同的字符串实例
string str1 = "hello";
string str2 = "hello";
string str3 = string.Intern(new string(new[] { 'h', 'e', 'l', 'l', 'o' }));

bool refEqual = object.ReferenceEquals(str1, str2); // true
bool refEqual2 = object.ReferenceEquals(str1, str3); // true
```

## 8. 实用示例

### 8.1 邮箱验证
```csharp
public static bool IsValidEmail(string email)
{
    if (string.IsNullOrWhiteSpace(email))
        return false;
    
    // 基本格式检查
    return email.Contains("@") && 
           email.IndexOf('@') > 0 && 
           email.LastIndexOf('@') == email.IndexOf('@') &&
           email.Length > email.LastIndexOf('.') + 1;
}
```

### 8.2 文件路径处理
```csharp
public static string GetSafeFileName(string fileName)
{
    if (string.IsNullOrWhiteSpace(fileName))
        return "default.txt";
    
    // 移除非法字符
    char[] invalidChars = Path.GetInvalidFileNameChars();
    string safeName = string.Join("_", fileName.Split(invalidChars));
    
    // 确保有扩展名
    if (!safeName.Contains('.'))
        safeName += ".txt";
        
    return safeName.Trim();
}
```

### 8.3 字符串加密（基础版）
```csharp
public static string SimpleEncrypt(string input)
{
    if (string.IsNullOrEmpty(input))
        return input;
    
    char[] chars = input.ToCharArray();
    for (int i = 0; i < chars.Length; i++)
    {
        chars[i] = (char)(chars[i] + 1); // 简单位移加密
    }
    return new string(chars);
}
```

## 9. 总结

### 关键要点：
- **字符串不可变**：任何修改操作都会创建新字符串
- **性能考虑**：大量字符串操作使用StringBuilder
- **比较选择**：根据场景选择合适的字符串比较方式
- **内存管理**：注意字符串驻留和内存使用

### 选择指南：
| 场景 | 推荐方式 |
|------|----------|
| 简单的字符串创建 | 直接赋值 `string str = "value"` |
| 复杂的字符串构建 | `StringBuilder` |
| 字符串格式化 | 字符串插值 `$"文本{变量}"` |
| 路径处理 | 逐字字符串 `@"C:\path"` |
| 大量字符串拼接 | `StringBuilder.Append()` |

### 代码片段：
::: details 点击查看更多细节
```csharp
using System.Diagnostics;
using System.Text;

namespace ConsoleApp1.StringChapt;

public class StringStudy
{
    /// <summary>
    /// 字符串的储存方式
    /// </summary>
    public void TestStringChapter()
    {
        //字面量的方式创建,会将“a”字符串放入常量池中
        string a = "a";
        //保持“a”字符串的地址引用赋值给b
        string b = "a";
        Console.WriteLine(ReferenceEquals(a,b));//true
    }

    /// <summary>
    /// 计时器
    /// </summary>
    public void TestStopWatch()
    {
        Stopwatch stopWatch = new Stopwatch();//计时器
        stopWatch.Start();
        string result = string.Empty;
        for (int i = 0; i < 100000; i++)
        {
            //字符串拼接+相当于Concat,将会产生新的string到heap(堆)上
            //将导致性能浪费，此情况应该使用StringBuilder
            result += i;
        }
        stopWatch.Stop();
        TimeSpan ts = stopWatch.Elapsed;
        Console.WriteLine(ts.Seconds);//7s
    }

    /// <summary>
    /// stringBuilder
    /// </summary>
    public void TestStringBuilder()
    {
        Stopwatch stopWatch = new Stopwatch();
        stopWatch.Start();
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < 100000; i++)
        {
            builder.Append(i);
        }
        string result = builder.ToString();
        stopWatch.Stop();
        TimeSpan ts = stopWatch.Elapsed;
        Console.WriteLine(ts.Milliseconds);//1ms
    }

    /// <summary>
    /// 字符串值比较
    /// </summary>
    public void TestStringCompare()
    {
        string a = "aaa";
        string b = "AAA";
        Console.WriteLine(a.Equals(b,StringComparison.OrdinalIgnoreCase));
    }

    public void YzmTest()
    {
        string yzmSource = "abcdefgABCDEFGHI1234567890";
        StringBuilder sb = new StringBuilder();
        //取四位验证码
        for (int i = 0; i < 4; i++)
        {
            int Rdindex = Random.Shared.Next(yzmSource.Length);
            sb.Append(yzmSource.Substring(Rdindex, 1));
        }
        Console.WriteLine(sb.ToString());
    }
}
```
:::
