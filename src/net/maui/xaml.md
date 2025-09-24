# XAML 基础语法指南

## 概述

XAML（eXtensible Application Markup Language）是一种基于XML的声明性语言，用于在.NET MAUI、WPF、UWP和Xamarin.Forms中构建用户界面。

## 1. 属性元素语法

属性元素语法允许使用子元素而不是属性来设置对象属性。

### 基本语法
```xml
<元素>
    <元素.属性>
        属性值或子元素
    </元素.属性>
</元素>
```

### 示例
```xml
<!-- 使用属性语法 -->
<Label Text="Hello World" TextColor="Red" />

<!-- 使用属性元素语法 -->
<Label>
    <Label.Text>Hello World</Label.Text>
    <Label.TextColor>Red</Label.TextColor>
</Label>
```

### 复杂属性设置
```xml
<LinearGradientBrush>
    <LinearGradientBrush.GradientStops>
        <GradientStopCollection>
            <GradientStop Color="Yellow" Offset="0.0" />
            <GradientStop Color="Red" Offset="0.25" />
            <GradientStop Color="Blue" Offset="1.0" />
        </GradientStopCollection>
    </LinearGradientBrush.GradientStops>
</LinearGradientBrush>
```

## 2. 附加属性

附加属性允许子元素设置在父元素中定义的属性。

### 语法
```xml
<子元素 父元素.附加属性="值" />
```

### 示例
```xml
<Grid>
    <Grid.RowDefinitions>
        <RowDefinition Height="*" />
        <RowDefinition Height="*" />
    </Grid.RowDefinitions>
    <Grid.ColumnDefinitions>
        <ColumnDefinition Width="*" />
        <ColumnDefinition Width="*" />
    </Grid.ColumnDefinitions>
    
    <!-- 使用附加属性定位元素 -->
    <Label Text="第一行第一列" Grid.Row="0" Grid.Column="0" />
    <Label Text="第一行第二列" Grid.Row="0" Grid.Column="1" />
    <Label Text="第二行第一列" Grid.Row="1" Grid.Column="0" />
</Grid>
```

## 3. 内容属性

内容属性允许省略属性名，直接将内容作为元素的默认属性值。

### 语法
```xml
<元素>
    直接内容（自动分配给内容属性）
</元素>
```

### 示例
```xml
<!-- ContentPage的内容属性是Content -->
<ContentPage>
    <StackLayout>
        <Label Text="Hello XAML" />
    </StackLayout>
</ContentPage>

<!-- 等价于 -->
<ContentPage>
    <ContentPage.Content>
        <StackLayout>
            <Label Text="Hello XAML" />
        </StackLayout>
    </ContentPage.Content>
</ContentPage>
```

## 4. 标记扩展

标记扩展提供了一种在XAML中设置属性值的强大方式，支持动态值、数据绑定和资源引用。

### 基本语法
```xml
<元素 属性="{扩展 参数}" />
```

### 4.1 共享资源 (StaticResource 和 DynamicResource)

#### StaticResource - 静态资源引用
```xml
<!-- 定义资源 -->
<ContentPage.Resources>
    <ResourceDictionary>
        <Color x:Key="PrimaryColor">#3498db</Color>
        <Style x:Key="LabelStyle" TargetType="Label">
            <Setter Property="TextColor" Value="{StaticResource PrimaryColor}" />
            <Setter Property="FontSize" Value="16" />
        </Style>
    </ResourceDictionary>
</ContentPage.Resources>

<!-- 使用资源 -->
<Label Text="Hello" Style="{StaticResource LabelStyle}" />
```

#### DynamicResource - 动态资源引用
```xml
<Label Text="Hello" TextColor="{DynamicResource PrimaryColor}" />

<!-- 在代码中动态更改资源 -->
Resources["PrimaryColor"] = Colors.Red; // 所有使用DynamicResource引用的地方会自动更新
```

### 4.2 静态引用 (x:Static)

#### 引用静态属性、字段或枚举
```xml
<!-- 引用枚举 -->
<StackLayout Orientation="{x:Static StackOrientation.Vertical}">
    <!-- 内容 -->
</StackLayout>

<!-- 引用应用程序常量 -->
<Label Text="{x:Static local:AppConstants.AppName}" />

<!-- 引用系统值 -->
<Label FontSize="{x:Static SystemFonts.CaptionFontSize}" />
```

### 4.3 其他常用标记扩展

#### 数据绑定 (Binding)
```xml
<Label Text="{Binding UserName}" />
<Entry Text="{Binding Email, Mode=TwoWay}" />
<Label Text="{Binding Score, StringFormat='得分: {0}'}" />
```

#### 模板绑定 (TemplateBinding)
```xml
<!-- 在控件模板中使用 -->
<ControlTemplate x:Key="ButtonTemplate">
    <Frame BackgroundColor="{TemplateBinding Background}"
           BorderColor="{TemplateBinding BorderColor}">
        <ContentPresenter />
    </Frame>
</ControlTemplate>
```

#### 相对资源 (RelativeSource)
```xml
<!-- 绑定到父元素 -->
<StackLayout>
    <Label Text="父元素宽度:" />
    <Label Text="{Binding Width, RelativeSource={RelativeSource AncestorType={x:Type StackLayout}}}" />
</StackLayout>
```

#### 空值处理 (x:Null)
```xml
<Label Text="{x:Null}" /> <!-- 清除Text属性 -->
<Button Style="{x:Null}" /> <!-- 移除样式 -->
```

## 5. 综合示例

```xml
<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2022/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             xmlns:sys="clr-namespace:System;assembly=netstandard"
             x:Class="MyApp.MainPage">
    
    <ContentPage.Resources>
        <ResourceDictionary>
            <!-- 颜色资源 -->
            <Color x:Key="PrimaryColor">#3498db</Color>
            <Color x:Key="SecondaryColor">#2ecc71</Color>
            
            <!-- 样式资源 -->
            <Style x:Key="HeaderStyle" TargetType="Label">
                <Setter Property="FontSize" Value="24" />
                <Setter Property="TextColor" Value="{StaticResource PrimaryColor}" />
                <Setter Property="HorizontalOptions" Value="Center" />
            </Style>
        </ResourceDictionary>
    </ContentPage.Resources>
    
    <ScrollView>
        <StackLayout Padding="20" Spacing="15">
            <!-- 使用静态资源 -->
            <Label Text="欢迎页面" Style="{StaticResource HeaderStyle}" />
            
            <!-- 使用数据绑定和静态引用 -->
            <Label Text="{Binding CurrentDate, StringFormat='当前日期: {0:yyyy-MM-dd}'}" />
            <Label Text="{x:Static sys:DateTime.Now, StringFormat='系统时间: {0:HH:mm:ss}'}" />
            
            <!-- 使用附加属性 -->
            <Grid>
                <Grid.RowDefinitions>
                    <RowDefinition Height="Auto" />
                    <RowDefinition Height="Auto" />
                </Grid.RowDefinitions>
                <Grid.ColumnDefinitions>
                    <ColumnDefinition Width="*" />
                    <ColumnDefinition Width="*" />
                </Grid.ColumnDefinitions>
                
                <Entry Placeholder="用户名" Grid.Row="0" Grid.Column="0" />
                <Entry Placeholder="密码" Grid.Row="0" Grid.Column="1" IsPassword="True" />
                
                <Button Text="登录" Grid.Row="1" Grid.ColumnSpan="2"
                        BackgroundColor="{StaticResource PrimaryColor}"
                        TextColor="White" />
            </Grid>
        </StackLayout>
    </ScrollView>
</ContentPage>
```

## 总结

XAML提供了丰富的语法特性来创建灵活、可维护的用户界面：

1. **属性元素语法**：用于设置复杂属性值
2. **附加属性**：允许子元素使用父元素定义的属性
3. **内容属性**：简化常用属性的设置
4. **标记扩展**：提供动态值和资源引用能力
   - `StaticResource`：一次性资源引用
   - `DynamicResource`：动态响应资源变化
   - `x:Static`：引用静态成员和枚举值
   - `Binding`：数据绑定支持
   - 其他扩展提供更多高级功能