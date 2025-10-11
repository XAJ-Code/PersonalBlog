# C# 集合完全指南：泛型与非泛型集合

## 集合概述

### 什么是集合？
集合是用于存储、组织和管理一组相关数据项的数据结构。与数组相比，集合提供了更灵活的数据操作方式。

### 主要分类
| 分类 | 特点 | 命名空间 | 版本 |
|------|------|----------|------|
| **泛型集合** | 类型安全，性能好 | `System.Collections.Generic` | .NET 2.0+ |
| **非泛型集合** | 可存储任意类型，性能较差 | `System.Collections` | .NET 1.0+ |
| **并发集合** | 线程安全 | `System.Collections.Concurrent` | .NET 4.0+ |
| **专用集合** | 特殊用途 | `System.Collections.Specialized` | .NET 1.0+ |

## 泛型集合

泛型集合提供类型安全，在编译时进行类型检查，避免装箱拆箱操作。

### 1. List<T> - 动态数组
**数据结构**：动态数组
**特点**：按索引访问，自动扩容

```csharp
using System.Collections.Generic;

// 创建和初始化
List<string> fruits = new List<string> { "Apple", "Banana" };
List<int> numbers = new List<int>(100); // 预分配容量

// 添加元素
fruits.Add("Orange");
fruits.AddRange(new[] { "Grape", "Mango" });

// 访问和修改
string first = fruits[0];
fruits[1] = "Blueberry";

// 查找和操作
int index = fruits.IndexOf("Orange");
bool exists = fruits.Contains("Apple");
fruits.Remove("Banana");
fruits.RemoveAt(0);

// 遍历
foreach (string fruit in fruits)
{
    Console.WriteLine(fruit);
}

// 使用LINQ查询
var aFruits = fruits.Where(f => f.StartsWith("A")).ToList();
```

### 2. Dictionary<TKey, TValue> - 哈希表
**数据结构**：哈希表
**特点**：键值对，快速查找

```csharp
Dictionary<string, int> ages = new Dictionary<string, int>
{
    ["Alice"] = 25,
    ["Bob"] = 30
};

// 添加元素
ages["Charlie"] = 35;
ages.Add("David", 28);

// 访问元素
int aliceAge = ages["Alice"];

// 安全访问
if (ages.TryGetValue("Eve", out int eveAge))
{
    Console.WriteLine($"Eve's age: {eveAge}");
}

// 遍历
foreach (KeyValuePair<string, int> kvp in ages)
{
    Console.WriteLine($"{kvp.Key}: {kvp.Value}");
}

// 只遍历键或值
foreach (string name in ages.Keys) { }
foreach (int age in ages.Values) { }
```

### 3. HashSet<T> - 哈希集合
**数据结构**：哈希表
**特点**：不重复元素，集合运算

```csharp
HashSet<int> set1 = new HashSet<int> { 1, 2, 3, 4 };
HashSet<int> set2 = new HashSet<int> { 3, 4, 5, 6 };

// 基本操作
set1.Add(5); // 添加元素
bool removed = set1.Remove(1); // 移除元素
bool contains = set1.Contains(3); // 检查存在

// 集合运算
HashSet<int> union = new HashSet<int>(set1);
union.UnionWith(set2); // 并集: {1,2,3,4,5,6}

HashSet<int> intersect = new HashSet<int>(set1);
intersect.IntersectWith(set2); // 交集: {3,4}

HashSet<int> except = new HashSet<int>(set1);
except.ExceptWith(set2); // 差集: {1,2}
```

### 4. Queue<T> - 队列
**数据结构**：先进先出队列
**特点**：FIFO处理

```csharp
Queue<string> queue = new Queue<string>();

// 入队
queue.Enqueue("First");
queue.Enqueue("Second");
queue.Enqueue("Third");

// 出队
string first = queue.Dequeue(); // "First"

// 查看队首（不移除）
string peek = queue.Peek(); // "Second"

// 遍历（从队首到队尾）
foreach (string item in queue)
{
    Console.WriteLine(item);
}
```

### 5. Stack<T> - 栈
**数据结构**：后进先出栈
**特点**：LIFO处理

```csharp
Stack<string> stack = new Stack<string>();

// 压栈
stack.Push("First");
stack.Push("Second");
stack.Push("Third");

// 弹栈
string last = stack.Pop(); // "Third"
string next = stack.Pop(); // "Second"

// 查看栈顶
string peek = stack.Peek(); // "First"
```

### 6. LinkedList<T> - 双向链表
**数据结构**：双向链表
**特点**：快速插入删除

```csharp
LinkedList<string> list = new LinkedList<string>();

// 添加元素
LinkedListNode<string> first = list.AddFirst("First");
LinkedListNode<string> last = list.AddLast("Last");
LinkedListNode<string> middle = list.AddAfter(first, "Middle");

// 遍历
foreach (string item in list)
{
    Console.WriteLine(item); // First, Middle, Last
}

// 通过节点操作
list.Remove(middle);
list.AddBefore(last, "New Middle");
```

### 7. SortedSet<T> - 排序集合
**数据结构**：红黑树
**特点**：自动排序，不重复

```csharp
SortedSet<int> sortedNumbers = new SortedSet<int> { 5, 2, 8, 1, 9 };
// 自动排序: 1, 2, 5, 8, 9

// 获取子集
foreach (int num in sortedNumbers.GetViewBetween(3, 7))
{
    Console.WriteLine(num); // 5
}
```

### 8. SortedDictionary<TKey, TValue> - 排序字典
**数据结构**：红黑树
**特点**：按键自动排序

```csharp
SortedDictionary<string, int> sortedAges = new SortedDictionary<string, int>
{
    ["Charlie"] = 35,
    ["Alice"] = 25,
    ["Bob"] = 30
};
// 按键排序: Alice:25, Bob:30, Charlie:35
```

## 非泛型集合

非泛型集合可以存储任意类型的对象，但存在类型安全和性能问题。

### 1. ArrayList - 动态对象数组
**数据结构**：动态数组
**特点**：可存储任意类型

```csharp
using System.Collections;

ArrayList list = new ArrayList();

// 添加各种类型元素
list.Add("String");
list.Add(123);
list.Add(DateTime.Now);
list.Add(new object());

// 访问元素（需要类型转换）
string str = (string)list[0];
int number = (int)list[1];

// 可能抛出InvalidCastException
try
{
    int invalid = (int)list[0]; // 运行时错误
}
catch (InvalidCastException ex)
{
    Console.WriteLine("类型转换错误");
}
```

### 2. Hashtable - 哈希表
**数据结构**：哈希表
**特点**：键值对，任意类型

```csharp
Hashtable table = new Hashtable();

// 添加键值对
table["name"] = "Alice";
table["age"] = 25;
table[123] = "Number key";

// 访问元素
string name = (string)table["name"];
int age = (int)table["age"];

// 遍历
foreach (DictionaryEntry entry in table)
{
    Console.WriteLine($"{entry.Key}: {entry.Value}");
}
```

### 3. Queue - 非泛型队列
**数据结构**：先进先出队列
**特点**：存储任意类型

```csharp
Queue queue = new Queue();

queue.Enqueue("String");
queue.Enqueue(123);
queue.Enqueue(DateTime.Now);

object item = queue.Dequeue();
string str = (string)item; // 需要类型转换
```

### 4. Stack - 非泛型栈
**数据结构**：后进先出栈
**特点**：存储任意类型

```csharp
Stack stack = new Stack();

stack.Push("String");
stack.Push(123);

object item = stack.Pop();
int number = (int)item; // 需要类型转换
```

### 5. SortedList - 排序列表
**数据结构**：排序数组
**特点**：按键排序的键值对

```csharp
SortedList sortedList = new SortedList();

sortedList["Charlie"] = 35;
sortedList["Alice"] = 25;
sortedList["Bob"] = 30;

// 自动按键排序
foreach (DictionaryEntry entry in sortedList)
{
    Console.WriteLine($"{entry.Key}: {entry.Value}");
}
```

## 并发集合

线程安全的集合类型，适用于多线程环境。

### 1. ConcurrentDictionary<TKey, TValue>
```csharp
using System.Collections.Concurrent;

ConcurrentDictionary<string, int> concurrentDict = new ConcurrentDictionary<string, int>();

// 线程安全的添加/更新
concurrentDict["key1"] = 1;
concurrentDict.AddOrUpdate("key1", 1, (key, oldValue) => oldValue + 1);

// 线程安全的获取
if (concurrentDict.TryGetValue("key1", out int value))
{
    Console.WriteLine(value);
}
```

### 2. ConcurrentQueue<T>
```csharp
ConcurrentQueue<string> concurrentQueue = new ConcurrentQueue<string>();

// 多线程安全操作
concurrentQueue.Enqueue("item1");
if (concurrentQueue.TryDequeue(out string item))
{
    Console.WriteLine(item);
}
```

### 3. ConcurrentStack<T>
```csharp
ConcurrentStack<string> concurrentStack = new ConcurrentStack<string>();

concurrentStack.Push("item1");
if (concurrentStack.TryPop(out string item))
{
    Console.WriteLine(item);
}
```

### 4. ConcurrentBag<T>
```csharp
ConcurrentBag<string> concurrentBag = new ConcurrentBag<string>();

concurrentBag.Add("item1");
if (concurrentBag.TryTake(out string item))
{
    Console.WriteLine(item);
}
```

## 性能对比

### 各集合类型的时间复杂度

| 集合类型 | 添加 | 访问 | 查找 | 删除 | 内存使用 |
|----------|------|------|------|------|----------|
| **List<T>** | O(1) 平摊 | O(1) | O(n) | O(n) | 中等 |
| **Dictionary<T,K>** | O(1) | O(1) | O(1) | O(1) | 较高 |
| **HashSet<T>** | O(1) | N/A | O(1) | O(1) | 较高 |
| **Queue<T>** | O(1) | O(1) | N/A | O(1) | 较低 |
| **Stack<T>** | O(1) | O(1) | N/A | O(1) | 较低 |
| **LinkedList<T>** | O(1) | O(n) | O(n) | O(1) | 较高 |
| **ArrayList** | O(1) 平摊 | O(1) | O(n) | O(n) | 中等（有装箱） |

### 内存占用比较
```csharp
// 泛型集合更节省内存
List<int> genericList = new List<int> { 1, 2, 3 };  // 直接存储int
ArrayList nonGenericList = new ArrayList { 1, 2, 3 }; // 存储装箱的object
```

## 最佳实践

### 1. 选择合适的集合类型

```csharp
// 需要索引访问和频繁遍历 → List<T>
List<Product> products = new List<Product>();

// 需要快速键值查找 → Dictionary<TKey, TValue>
Dictionary<int, Customer> customers = new Dictionary<int, Customer>();

// 需要唯一性保证 → HashSet<T>
HashSet<string> uniqueEmails = new HashSet<string>();

// 需要FIFO处理 → Queue<T>
Queue<Order> orderQueue = new Queue<Order>();

// 需要LIFO处理 → Stack<T>
Stack<Command> undoStack = new Stack<Command>();

// 需要频繁插入删除 → LinkedList<T>
LinkedList<LogEntry> logEntries = new LinkedList<LogEntry>();

// 需要自动排序 → SortedSet<T> 或 SortedDictionary<TKey, TValue>
SortedSet<DateTime> appointmentTimes = new SortedSet<DateTime>();
```

### 2. 性能优化技巧

```csharp
// 预分配容量（已知大小时）
List<string> largeList = new List<string>(10000);
Dictionary<int, string> largeDict = new Dictionary<int, string>(5000);

// 使用合适的相等比较器
HashSet<Product> products = new HashSet<Product>(ProductEqualityComparer.Instance);

// 批量操作使用AddRange
List<int> numbers = new List<int>();
numbers.AddRange(Enumerable.Range(1, 1000));
```

### 3. 线程安全考虑

```csharp
// 单线程环境使用普通集合
List<string> singleThreadList = new List<string>();

// 多线程环境使用并发集合
ConcurrentBag<string> threadSafeBag = new ConcurrentBag<string>();

// 或者使用锁机制
List<string> sharedList = new List<string>();
object lockObj = new object();

lock (lockObj)
{
    sharedList.Add("item");
}
```

### 4. 避免常见陷阱

```csharp
// ❌ 不要在循环中修改集合
foreach (var item in list.ToArray()) // 先复制
{
    if (condition)
        list.Remove(item);
}

// ✅ 使用LINQ或反向遍历
list.RemoveAll(item => condition);

// ❌ 避免不必要的装箱拆箱
ArrayList badList = new ArrayList { 1, 2, 3 }; // 装箱
List<int> goodList = new List<int> { 1, 2, 3 }; // 无装箱

// ✅ 使用泛型集合
Dictionary<string, int> goodDict = new Dictionary<string, int>();
```

## 总结

### 选择指南

| 需求 | 推荐集合 | 原因 |
|------|----------|------|
| 通用列表存储 | `List<T>` | 类型安全，性能好 |
| 键值对查找 | `Dictionary<TKey,TValue>` | 快速查找，类型安全 |
| 唯一元素集合 | `HashSet<T>` | 自动去重，集合运算 |
| 先进先出处理 | `Queue<T>` | FIFO语义，性能好 |
| 后进先出处理 | `Stack<T>` | LIFO语义，性能好 |
| 频繁插入删除 | `LinkedList<T>` | O(1)插入删除 |
| 排序需求 | `SortedSet<T>`/`SortedDictionary<T,K>` | 自动排序 |
| 多线程环境 | `ConcurrentDictionary<T,K>`等 | 线程安全 |
| 遗留代码维护 | `ArrayList`/`Hashtable` | 兼容性 |

### 现代C#开发建议

1. **优先使用泛型集合**：类型安全，性能更好
2. **避免非泛型集合**：除非有特殊兼容性需求
3. **合理选择数据结构**：根据操作需求选择合适集合
4. **注意线程安全**：多线程环境使用并发集合
5. **考虑性能特征**：了解各集合的时间复杂度