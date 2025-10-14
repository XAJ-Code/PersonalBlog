# C# 中的 I/O 流（输入/输出流）详解

## 什么是 I/O 流？

I/O 流（Input/Output Stream）是 C# 中用于处理数据输入和输出的抽象概念。它提供了一种统一的方式来读取和写入不同类型的数据源，如文件、内存、网络连接等。

![imageTest](../../assets/images/stream.png)

## 核心流类

### 1. 基本流类（位于 `System.IO` 命名空间）

| 类名 | 描述 |
|------|------|
| `Stream` | 所有流的抽象基类 |
| `FileStream` | 用于文件读写 |
| `MemoryStream` | 内存中的流 |
| `BufferedStream` | 提供缓冲功能的流 |
| `NetworkStream` | 网络通信流 |
| `CryptoStream` | 加密数据流 |

### 2. 读写器类（简化流操作）

| 类名 | 描述 |
|------|------|
| `StreamReader`/`StreamWriter` | 文本读写器 |
| `BinaryReader`/`BinaryWriter` | 二进制读写器 |

## 流的基本操作

### 1. 文件流示例

```csharp
using System.IO;

// 写入文件
string filePath = "example.txt";
using (FileStream fs = new FileStream(filePath, FileMode.Create))
using (StreamWriter writer = new StreamWriter(fs))
{
    writer.WriteLine("Hello, World!");
    writer.WriteLine("This is a sample text.");
}

// 读取文件
using (FileStream fs = new FileStream(filePath, FileMode.Open))
using (StreamReader reader = new StreamReader(fs))
{
    string line;
    while ((line = reader.ReadLine()) != null)
    {
        Console.WriteLine(line);
    }
}
```

### 2. 内存流示例

```csharp
// 写入内存流
using (MemoryStream ms = new MemoryStream())
using (StreamWriter writer = new StreamWriter(ms))
{
    writer.WriteLine("Data in memory");
    writer.Flush(); // 确保数据写入内存流
    
    // 读取内存流
    ms.Position = 0; // 重置位置
    using (StreamReader reader = new StreamReader(ms))
    {
        Console.WriteLine(reader.ReadToEnd());
    }
}
```

## 常见流操作模式

### 1. 文件访问模式

```csharp
// 文件打开模式
FileMode.Create       // 创建新文件，如果存在则覆盖
FileMode.CreateNew    // 创建新文件，如果存在则抛出异常
FileMode.Open         // 打开现有文件
FileMode.OpenOrCreate // 打开文件，如果不存在则创建
FileMode.Append       // 打开文件并定位到末尾
FileMode.Truncate     // 打开现有文件并清空内容

// 文件访问权限
FileAccess.Read       // 只读
FileAccess.Write      // 只写
FileAccess.ReadWrite  // 读写

// 文件共享选项
FileShare.None        // 拒绝共享
FileShare.Read        // 允许后续读操作
FileShare.Write       // 允许后续写操作
FileShare.ReadWrite   // 允许后续读写操作
```

### 2. 二进制读写

```csharp
// 写入二进制数据
using (FileStream fs = new FileStream("data.bin", FileMode.Create))
using (BinaryWriter writer = new BinaryWriter(fs))
{
    writer.Write(123);          // int
    writer.Write(3.14);         // double
    writer.Write("Hello");       // string
    writer.Write(new byte[] { 1, 2, 3 }); // byte array
}

// 读取二进制数据
using (FileStream fs = new FileStream("data.bin", FileMode.Open))
using (BinaryReader reader = new BinaryReader(fs))
{
    int number = reader.ReadInt32();
    double value = reader.ReadDouble();
    string text = reader.ReadString();
    byte[] bytes = reader.ReadBytes(3);
}
```

## 高级流操作

### 1. 异步流操作

```csharp
// 异步写入
async Task WriteFileAsync(string path, string content)
{
    using (FileStream fs = new FileStream(path, FileMode.Create, FileAccess.Write, FileShare.None, 4096, true))
    using (StreamWriter writer = new StreamWriter(fs))
    {
        await writer.WriteAsync(content);
    }
}

// 异步读取
async Task<string> ReadFileAsync(string path)
{
    using (FileStream fs = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read, 4096, true))
    using (StreamReader reader = new StreamReader(fs))
    {
        return await reader.ReadToEndAsync();
    }
}
```

### 2. 缓冲流

```csharp
// 使用缓冲流提高性能
using (FileStream fs = new FileStream("largefile.dat", FileMode.Open))
using (BufferedStream bs = new BufferedStream(fs, 8192)) // 8KB缓冲区
using (StreamReader reader = new StreamReader(bs))
{
    // 读取操作会更快
}
```

### 3. 流的位置操作

```csharp
using (MemoryStream ms = new MemoryStream())
{
    ms.WriteByte(65); // 'A'
    ms.WriteByte(66); // 'B'
    
    Console.WriteLine(ms.Position); // 2
    ms.Position = 0; // 回到开始位置
    
    Console.WriteLine(ms.ReadByte()); // 65
    Console.WriteLine(ms.ReadByte()); // 66
    
    // 设置长度
    ms.SetLength(10);
    Console.WriteLine(ms.Length); // 10
}
```

## 常见流的使用场景

### 1. 文件操作

```csharp
// 复制文件
void CopyFile(string source, string destination)
{
    using (FileStream sourceStream = new FileStream(source, FileMode.Open))
    using (FileStream destStream = new FileStream(destination, FileMode.Create))
    {
        sourceStream.CopyTo(destStream);
    }
}
```

### 2. 序列化和反序列化

```csharp
// 使用流进行对象序列化
void SerializeToFile<T>(T obj, string path)
{
    using (FileStream fs = new FileStream(path, FileMode.Create))
    {
        var formatter = new System.Runtime.Serialization.Formatters.Binary.BinaryFormatter();
        formatter.Serialize(fs, obj);
    }
}

// 反序列化
T DeserializeFromFile<T>(string path)
{
    using (FileStream fs = new FileStream(path, FileMode.Open))
    {
        var formatter = new System.Runtime.Serialization.Formatters.Binary.BinaryFormatter();
        return (T)formatter.Deserialize(fs);
    }
}
```

### 3. 加密流

```csharp
using System.Security.Cryptography;

void EncryptFile(string inputFile, string outputFile, byte[] key, byte[] iv)
{
    using (Aes aes = Aes.Create())
    using (FileStream inStream = new FileStream(inputFile, FileMode.Open))
    using (FileStream outStream = new FileStream(outputFile, FileMode.Create))
    using (CryptoStream cryptoStream = new CryptoStream(
        outStream, 
        aes.CreateEncryptor(key, iv), 
        CryptoStreamMode.Write))
    {
        inStream.CopyTo(cryptoStream);
    }
}
```

## 最佳实践

1. **始终使用 `using` 语句**：确保流被正确关闭和释放资源
   ```csharp
   // 正确做法
   using (FileStream fs = new FileStream("file.txt", FileMode.Open))
   {
       // 操作流
   }
   
   // 错误做法（可能忘记关闭流）
   FileStream fs = new FileStream("file.txt", FileMode.Open);
   // 操作流
   // 可能忘记调用 fs.Close()

   public void TestStream()
    {
        var filePath = "./test.txt";
        using FileStream fileStream = new FileStream(filePath, FileMode.OpenOrCreate,FileAccess.Read);
        byte[] bytes = new byte[fileStream.Length];
        fileStream.ReadExactly(bytes, 0, bytes.Length);//将文件读取到缓冲区byte[]
        string str = Encoding.UTF8.GetString(bytes);
        Console.WriteLine(str);
    }
   ```

2. **处理大文件时使用缓冲区**：
   ```csharp
   byte[] buffer = new byte[8192]; // 8KB缓冲区
   int bytesRead;
   while ((bytesRead = inputStream.Read(buffer, 0, buffer.Length)) > 0)
   {
       outputStream.Write(buffer, 0, bytesRead);
   }
   ```

3. **优先使用异步操作**：提高应用程序响应能力
   ```csharp
   await stream.ReadAsync(buffer, 0, buffer.Length);
   ```

4. **检查流是否可读/可写/可定位**：
   ```csharp
   if (stream.CanRead) { /* 可以读取 */ }
   if (stream.CanWrite) { /* 可以写入 */ }
   if (stream.CanSeek) { /* 可以定位 */ }
   ```

5. **处理不同编码的文本文件**：
   ```csharp
   using (StreamReader reader = new StreamReader("file.txt", Encoding.UTF8))
   {
       // 读取UTF-8编码的文件
   }
   ```

## 常见问题解决

### 1. 文件被占用问题

```csharp
try
{
    using (FileStream fs = new FileStream("file.txt", FileMode.Open))
    {
        // 操作文件
    }
}
catch (IOException ex) when (ex.Message.Contains("used by another process"))
{
    Console.WriteLine("文件被其他进程占用，请关闭相关程序后重试");
}
```

### 2. 大文件处理

```csharp
void ProcessLargeFile(string path)
{
    const int bufferSize = 65536; // 64KB
    
    using (FileStream fs = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read, bufferSize))
    using (BufferedStream bs = new BufferedStream(fs, bufferSize))
    using (StreamReader reader = new StreamReader(bs))
    {
        string line;
        while ((line = reader.ReadLine()) != null)
        {
            // 处理每一行
        }
    }
}
```

### 3. 临时文件处理

```csharp
string tempFile = Path.GetTempFileName();
try
{
    using (FileStream fs = new FileStream(tempFile, FileMode.Open))
    {
        // 使用临时文件
    }
}
finally
{
    File.Delete(tempFile); // 确保删除临时文件
}
```

## 总结

C# 中的 I/O 流提供了强大而灵活的数据处理能力，主要包括：

1. **基础流类**：`Stream` 及其派生类（`FileStream`, `MemoryStream` 等）
2. **读写器类**：`StreamReader`/`StreamWriter`, `BinaryReader`/`BinaryWriter`
3. **核心功能**：同步/异步读写、定位、缓冲等
4. **应用场景**：文件操作、数据序列化、加密解密、网络通信等

正确使用流的关键在于：
- 理解不同流类型的特性和适用场景
- 始终确保资源被正确释放（使用 `using` 语句）
- 对大文件操作使用缓冲和适当的分块处理
- 在需要响应性的场景中使用异步操作