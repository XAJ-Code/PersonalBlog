# MVVM 模式完全指南

## 什么是 MVVM？

**MVVM**（Model-View-ViewModel）是一种软件架构模式，专门为数据绑定场景设计，将用户界面逻辑与业务逻辑分离。

## 核心组件

### 1. Model（模型）
- **职责**：代表应用程序的数据和业务逻辑
- **特点**：
  - 包含数据实体和业务规则
  - 不包含任何 UI 相关代码
  - 通常实现不需要实现 `INotifyPropertyChanged`,特殊情况需要实现，就是需要跨层的数据传递

```csharp
// 正确的Model设计：纯净的数据实体
public class Note
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public DateTime CreatedDate { get; set; }
    
    // 可以包含业务逻辑，但不包含UI相关代码
    public bool IsValid() => !string.IsNullOrEmpty(Title);
}
```

### 2. View（视图）
- **职责**：用户界面的视觉呈现
- **特点**：
  - 只包含 UI 元素和布局
  - 通过数据绑定与 ViewModel 连接
  - 不包含业务逻辑

```xml
<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             x:Class="MyApp.Views.NotesPage"
             x:DataType="viewModels:NotesViewModel">
    <CollectionView ItemsSource="{Binding Notes}">
        <DataTemplate>
            <Label Text="{Binding Title}" />
        </DataTemplate>
    </CollectionView>
    <Button Text="添加笔记" Command="{Binding AddNoteCommand}" />
</ContentPage>
```

### 3. ViewModel（视图模型）
- **职责**：连接 View 和 Model 的桥梁
- **特点**：
  - 包含视图的状态和行为
  - 实现 `INotifyPropertyChanged`
  - 使用命令（`ICommand`）处理用户交互

```csharp
public class NotesViewModel : INotifyPropertyChanged
{
  private readonly Note _note; // 持有Model引用
    private ObservableCollection<Note> _notes;
    public ObservableCollection<Note> Notes
    {
        get => _notes;
        set
        {
            _notes = value;
            OnPropertyChanged();
        }
    }

    public ICommand AddNoteCommand { get; }

    public NotesViewModel()
    {
        AddNoteCommand = new Command(AddNote);
        LoadNotes();
    }

    private void AddNote()
    {
        Notes.Add(new Note { Title = "新笔记" });
    }

    public event PropertyChangedEventHandler PropertyChanged;
    protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
```

## 数据绑定机制

### 1. 属性绑定
```xml
<Label Text="{Binding UserName}" />
<Entry Text="{Binding Email, Mode=TwoWay}" />
```

### 2. 命令绑定
```xml
<Button Command="{Binding SaveCommand}" />
<Button Command="{Binding DeleteCommand}" CommandParameter="{Binding Id}" />
```

### 3. 集合绑定
```xml
<ListView ItemsSource="{Binding Items}">
    <ListView.ItemTemplate>
        <DataTemplate>
            <TextCell Text="{Binding Name}" />
        </DataTemplate>
    </ListView.ItemTemplate>
</ListView>
```

## INotifyPropertyChanged 接口

### 作用
通知界面属性值已更改，需要更新显示

### 基础实现
```csharp
public class ObservableObject : INotifyPropertyChanged
{
    public event PropertyChangedEventHandler PropertyChanged;

    protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }

    protected bool SetProperty<T>(ref T storage, T value, [CallerMemberName] string propertyName = null)
    {
        if (EqualityComparer<T>.Default.Equals(storage, value))
            return false;

        storage = value;
        OnPropertyChanged(propertyName);
        return true;
    }
}
```

### 使用示例
```csharp
public class UserViewModel : ObservableObject
{
    private string _name;
    public string Name
    {
        get => _name;
        set => SetProperty(ref _name, value);
    }
}
```

## ICommand 接口

### 作用
处理用户交互操作（按钮点击、手势等）

### 基础实现
```csharp
public class RelayCommand : ICommand
{
    private readonly Action _execute;
    private readonly Func<bool> _canExecute;

    public RelayCommand(Action execute, Func<bool> canExecute = null)
    {
        _execute = execute;
        _canExecute = canExecute;
    }

    public bool CanExecute(object parameter) => _canExecute?.Invoke() ?? true;

    public void Execute(object parameter) => _execute();

    public event EventHandler CanExecuteChanged;

    public void RaiseCanExecuteChanged() => CanExecuteChanged?.Invoke(this, EventArgs.Empty);
}
```

### 使用示例
```csharp
public class MainViewModel : ObservableObject
{
    public ICommand LoadDataCommand { get; }
    public ICommand SaveDataCommand { get; }

    public MainViewModel()
    {
        LoadDataCommand = new RelayCommand(LoadData, () => !IsLoading);
        SaveDataCommand = new RelayCommand(SaveData);
    }

    private void LoadData()
    {
        // 加载数据逻辑
    }

    private void SaveData()
    {
        // 保存数据逻辑
    }
}
```

## 依赖注入与生命周期

### 1. 注册服务
```csharp
// MauiProgram.cs
builder.Services.AddSingleton<INotesService, NotesService>();
builder.Services.AddTransient<NotesViewModel>();
builder.Services.AddTransient<NotesPage>();
```

### 2. 构造函数注入
```csharp
public class NotesViewModel
{
    private readonly INotesService _notesService;

    public NotesViewModel(INotesService notesService)
    {
        _notesService = notesService;
    }
}
```

### 3. 页面解析
```csharp
// 在App.xaml.cs或路由中
var page = App.ServiceProvider.GetService<NotesPage>();
```

## 消息传递机制

### 使用 `MessagingCenter`
```csharp
// 发送消息
MessagingCenter.Send(this, "NoteAdded", newNote);

// 接收消息
MessagingCenter.Subscribe<NotesViewModel, Note>(this, "NoteAdded", (sender, note) =>
{
    // 处理新笔记
});

// 取消订阅
MessagingCenter.Unsubscribe<NotesViewModel>(this, "NoteAdded");
```

## 最佳实践

### 1. 视图设计原则
- 保持视图简单，只包含 UI 逻辑
- 使用数据模板和样式重用 UI
- 避免在视图中编写业务逻辑

### 2. ViewModel 设计原则
- 一个 ViewModel 对应一个视图
- 使用异步方法处理耗时操作
- 实现 `IDisposable` 清理资源

### 3. 测试策略
```csharp
[Test]
public void AddNoteCommand_AddsNoteToCollection()
{
    var vm = new NotesViewModel();
    var initialCount = vm.Notes.Count;
    
    vm.AddNoteCommand.Execute(null);
    
    Assert.AreEqual(initialCount + 1, vm.Notes.Count);
}
```

### 4. 性能优化
- 使用 `ObservableCollection` 替代 `List` 用于集合绑定
- 批量更新时暂停通知
- 使用弱引用避免内存泄漏

## 常见问题解决方案

### 1. 内存泄漏
```csharp
// 在页面中重写 OnDisappearing
protected override void OnDisappearing()
{
    base.OnDisappearing();
    MessagingCenter.Unsubscribe<NotesViewModel>(this);
}
```

### 2. 异步命令
```csharp
public class AsyncCommand : ICommand
{
    private readonly Func<Task> _execute;
    private bool _isExecuting;

    public AsyncCommand(Func<Task> execute)
    {
        _execute = execute;
    }

    public bool CanExecute(object parameter) => !_isExecuting;

    public async void Execute(object parameter)
    {
        _isExecuting = true;
        RaiseCanExecuteChanged();
        
        try
        {
            await _execute();
        }
        finally
        {
            _isExecuting = false;
            RaiseCanExecuteChanged();
        }
    }

    public event EventHandler CanExecuteChanged;
    public void RaiseCanExecuteChanged() => CanExecuteChanged?.Invoke(this, EventArgs.Empty);
}
```

## 工具和框架推荐

### 1. 社区工具包
```csharp
// 使用 CommunityToolkit.Mvvm
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;

[ObservableObject]
public partial class NotesViewModel
{
    [ObservableProperty]
    private ObservableCollection<Note> _notes;

    [RelayCommand]
    private void AddNote()
    {
        Notes.Add(new Note());
    }
}
```

### 2. 流行框架
-  **.NET 社区MVVM工具包**：.NET 社区 MVVM 框架[NET 社区MVVM工具包](https://learn.microsoft.com/zh-cn/dotnet/communitytoolkit/mvvm/)
- **Prism**：企业级 MVVM 框架[Prism](https://prismlibrary.com/)
- **ReactiveUI**：响应式 MVVM 框架
- **MvvmCross**：跨平台 MVVM 框架