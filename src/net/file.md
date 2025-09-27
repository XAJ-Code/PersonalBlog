# .NET 文件路径与文件操作指南

```csharp
var filePath = Path.combine(Directory.GetCurrentDirectory(),"test.txt");
string fileName = Assembly.GetExecutingAssembly().Location;//获取当前程序集的路径,相当于nodejs中的 __filename
string fileDirectory = Path.GetDirectoryName(fileName)??string.Empty;//获取当前程序集的目录,相当于nodejs中的 __dirname
Console.writeLine($"当前的工作路径是filePath};编译后执行的d11路径是{fileName};
dll的Console.writeLine($"当前的工作路径是录是{fileDirectory}");
```

## 目录
1. #获取文件路径
   - #系统特殊文件夹路径
   - #应用程序相关路径
   - #当前工作目录
   - #自定义路径处理
2. #文件读取操作
   - #文本文件操作
   - #二进制文件操作
   - #文件流操作
3. #文件写入操作
4. #文件与目录管理
5. #最佳实践

---

## 获取文件路径

### 系统特殊文件夹路径

```csharp
// 获取桌面路径
string desktopPath = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);

// 获取文档路径
string documentsPath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);

// 获取应用程序数据路径
string appDataPath = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData);

// 获取临时文件夹路径
string tempPath = Path.GetTempPath();

//创建临时文件
string tempFile = Path.GetTempFileName();

//获取随机文件名
string randomFileName = Path.GetRandomFileName();
```

常用 `Environment.SpecialFolder` 枚举值：

| 枚举值 | 说明 |
|--------|------|
| `Desktop` | 用户桌面 |
| `MyDocuments` | 用户文档 |
| `ApplicationData` | AppData\Roaming |
| `LocalApplicationData` | AppData\Local |
| `ProgramFiles` | Program Files |
| `UserProfile` | 用户主目录 |

### 应用程序相关路径

```csharp
// 获取应用程序启动目录（推荐）
string appPath = AppDomain.CurrentDomain.BaseDirectory;

// 获取EXE文件所在目录
string exeDir = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

// 获取EXE完整路径
string exePath = Assembly.GetExecutingAssembly().Location;
```

### 当前工作目录

```csharp
string currentDir = Environment.CurrentDirectory;
string currentDir2 = Directory.GetCurrentDirectory();
```

### 自定义路径处理

```csharp
// 路径拼接（推荐）
string fullPath = Path.Combine("C:", "MyApp", "data.txt");

// 路径解析
string dir = Path.GetDirectoryName(fullPath);  // 获取目录
string fileName = Path.GetFileName(fullPath);  // 获取文件名
string ext = Path.GetExtension(fullPath);     // 获取扩展名
```

---

## 文件读取操作

### 文本文件操作

```csharp
// 读取所有文本
string content = File.ReadAllText("file.txt");

// 按行读取
string[] lines = File.ReadAllLines("file.txt");

// 流式读取（大文件适用）
using (StreamReader reader = new StreamReader("file.txt"))
{
    while (!reader.EndOfStream)
    {
        string line = reader.ReadLine();
        // 处理每行
    }
}
```

### 二进制文件操作

```csharp
// 读取所有字节
byte[] data = File.ReadAllBytes("file.bin");

// 流式读取二进制文件
using (FileStream fs = new FileStream("file.bin", FileMode.Open))
using (BinaryReader reader = new BinaryReader(fs))
{
    int intValue = reader.ReadInt32();
    float floatValue = reader.ReadSingle();
    // 其他数据类型...
}
```

### 文件流操作

```csharp
using (FileStream fs = new FileStream("file.dat", FileMode.Open))
{
    // 读取操作
    byte[] buffer = new byte[1024];
    int bytesRead = fs.Read(buffer, 0, buffer.Length);
    
    // 写入操作
    byte[] data = Encoding.UTF8.GetBytes("Hello");
    fs.Write(data, 0, data.Length);
}
```

---

## 文件写入操作

```csharp
// 写入所有文本
File.WriteAllText("file.txt", "Hello World");

// 按行写入
string[] lines = { "Line1", "Line2", "Line3" };
File.WriteAllLines("file.txt", lines);

// 追加文本
File.AppendAllText("file.txt", "Additional content");

// 二进制写入
byte[] data = new byte[] { 0x01, 0x02, 0x03 };
File.WriteAllBytes("file.bin", data);

// 流式写入（大文件适用）
using (StreamWriter writer = new StreamWriter("file.txt"))
{
    writer.WriteLine("Line 1");
    writer.WriteLine("Line 2");
}
```

---

## 文件与目录管理

```csharp
// 检查文件/目录是否存在
bool fileExists = File.Exists("file.txt");
bool dirExists = Directory.Exists("folder");

// 创建目录
Directory.CreateDirectory("newFolder");

// 获取目录下所有文件
string[] files = Directory.GetFiles("folder");

// 获取子目录
string[] subDirs = Directory.GetDirectories("folder");

// 文件操作
File.Copy("source.txt", "dest.txt");
File.Move("old.txt", "new.txt");
File.Delete("file.txt");

// 获取文件信息
FileInfo fileInfo = new FileInfo("file.txt");
DateTime created = fileInfo.CreationTime;
long size = fileInfo.Length;
```

---

## 最佳实践

1. **始终使用 `Path.Combine` 拼接路径**，避免手动拼接路径分隔符
2. **检查文件/目录是否存在** 再进行操作
3. **使用 `using` 语句** 管理文件流，确保资源释放
4. **处理异常**（如 `IOException`, `UnauthorizedAccessException`）
5. **考虑文件锁定问题**，特别是在多线程/多进程环境中
6. **大文件使用流式处理**，避免内存问题

```csharp
try
{
    if (File.Exists("file.txt"))
    {
        using (StreamReader reader = new StreamReader("file.txt"))
        {
            // 文件操作
        }
    }
}
catch (IOException ex)
{
    Console.WriteLine($"文件操作错误: {ex.Message}");
}
```