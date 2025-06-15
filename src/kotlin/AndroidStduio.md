# Android Stduio部分介绍
## Android Studio是Google官方的Android开发环境，基于IntelliJ IDEA构建，提供了丰富的功能和工具来支持Android应用的开发。
## Android Studio的主要特点包括：
- **智能代码编辑器**：提供代码补全、重构、语法高亮等功能，帮助开发者更高效地编写代码。
- **布局编辑器**：可视化设计Android应用的用户界面，支持拖放操作和实时预览。
- **Gradle构建系统**：使用Gradle作为构建工具，支持多种构建变体和依赖管理。
- **模拟器**：内置Android模拟器，支持多种设备配置和API级别，方便测试应用。
- **调试工具**：提供强大的调试功能，包括断点、变量监视、性能分析等，帮助开发者快速定位和修复问题。
- **版本控制集成**：支持Git、SVN等版本控制系统，方便团队协作和代码管理。
## Android Studio的安装和配置
1. **下载**：访问[Android Studio官网](https://developer.android.com/studio)下载最新版本的Android Studio。
2. **安装**：按照安装向导的指示完成安装，选择需要的组件（如Android SDK、模拟器等）。
3. **配置SDK**：安装完成后，打开Android Studio，进入“SDK Manager”配置Android SDK的路径和版本。
4. **创建新项目**：在欢迎界面选择“Start a new Android Studio project”，按照向导填写项目名称、包名、保存路径等信息。
5. **选择模板**：选择合适的项目模板（如Empty Activity、Basic Activity等），点击“Finish”创建项目。
## Android Studio的常用快捷键
- **Ctrl + N**：快速打开类文件。
- **Ctrl + Shift + N**：快速打开文件。
- **Ctrl + Alt + L**：格式化代码。
- **Ctrl + Alt + O**：优化导入的包。
- **Ctrl + Shift + A**：查找并执行任何操作或设置。
- **Alt + Enter**：快速修复代码问题或添加导入。
- **Ctrl + F12**：查看当前类的结构。
- **Shift + F10**：运行应用。
- **Shift + F9**：调试应用。
## Android Studio的常用插件
- **ADB Idea**：提供ADB命令的快捷方式，方便调试和测试。
- **ButterKnife Zelezny**：自动生成ButterKnife注解代码，简化视图绑定。
- **GsonFormat**：将JSON字符串转换为Java类，方便处理网络数据。
- **Lombok Plugin**：支持Lombok注解，简化Java代码的编写。
- **Material Theme UI**：提供多种主题和配色方案，提升开发环境的美观性。
## Android Studio的常见问题
- **无法启动模拟器**：检查是否安装了HAXM（Intel硬件加速执行管理器），并确保BIOS中启用了虚拟化技术。
- **Gradle构建失败**：检查`build.gradle`文件中的依赖是否正确，确保网络连接正常以下载依赖。
- **代码提示不工作**：尝试重启Android Studio，或在“File”菜单中选择“Invalidate Caches / Restart”清除缓存。
## Android Studio的学习资源
- **官方文档**：访问[Android Studio官方文档](https://developer.android.com/studio/intro)获取详细的使用指南和教程。
- **在线课程**：参加Coursera、Udacity等平台的Android开发课程，系统学习Android Studio的使用。
## Android Studio的最佳实践
- **定期更新**：保持Android Studio和SDK的最新版本，以获得最新的功能和修复。
- **使用版本控制**：将项目代码托管在GitHub等平台，方便团队协作和版本管理。
## Android Studio配置Maven仓库国内镜像
- **配置步骤**：
  1. 打开Android Studio，进入“File” -> “Settings”。
  2. 在左侧菜单中选择“Build, Execution, Deployment” -> “Build Tools” -> “Gradle”。
  3. 在“Gradle JDK”下拉菜单中选择合适的JDK版本。
  4. 在“Global Gradle settings”中，勾选“Offline work”（离线工作）以避免网络问题。
  5. 在“Repositories”中添加国内镜像地址，如阿里云、清华大学等。
- **常用国内镜像地址**：
  - 阿里云：`https://maven.aliyun.com/nexus/content/groups/public/`
  - 清华大学：`https://mirrors.tuna.tsinghua.edu.cn/maven/`
  - 中科大：`https://mirrors.ustc.edu.cn/maven/`
  * **配置示例**：settings.gradle.kts文件
```groovy
pluginManagement {
    repositories {
        // 使用国内镜像源加速插件下载
        maven { url = uri("https://maven.aliyun.com/repository/google") }
        maven { url = uri("https://maven.aliyun.com/repository/releases") }
        maven { url = uri("https://maven.aliyun.com/repository/centeral") }
        maven { url = uri("https://maven.aliyun.com/repository/public") }
        maven { url = uri("https://maven.aliyun.com/repository/gradle-plugin") }
        maven { url = uri("https://maven.aliyun.com/repository/apache-snapshots") }
        maven { url = uri("https://maven.aliyun.com/nexus/content/groups/public/") }
        maven { url = uri("https://jitpack.io") }

        google {
            content {
                includeGroupByRegex("com\\.android.*")
                includeGroupByRegex("com\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        // 使用国内镜像源加速依赖下载
        maven { url = uri("https://maven.aliyun.com/repository/google") }
        maven { url = uri("https://maven.aliyun.com/repository/releases") }
        maven { url = uri("https://maven.aliyun.com/repository/centeral") }
        maven { url = uri("https://maven.aliyun.com/repository/public") }
        maven { url = uri("https://maven.aliyun.com/repository/gradle-plugin") }
        maven { url = uri("https://maven.aliyun.com/repository/apache-snapshots") }
        maven { url = uri("https://maven.aliyun.com/nexus/content/groups/public/") }
        maven { url = uri("https://jitpack.io") }
        // 使用Google和Maven Central仓库--官方
        google()
        mavenCentral()
    }
}
rootProject.name = "My Application"
include(":app")
```

## Gradle配置国内镜像
### Gradle简介
Gradle是一个现代化的构建自动化工具，广泛用于Java、Android等项目的构建和依赖管理。它使用Groovy或Kotlin作为脚本语言，提供了灵活的配置和扩展能力。

1. 在项目的gradle目录下找到gradle-wrapper.properties文件。
```groovy
# 在gradle-wrapper.properties文件中添加以下内容
//官方地址services.gradle.org
distributionUrl=https\://services.gradle.org/distributions/gradle-7.0-all.zip
// gradle-8.11.1-all.zip---gradle的版本一般在C盘-user-.gradle中存放gradle的版本
//可在设置中修改gradle的存储路径
```
## Gradle Distribution URL 及镜像下载地址汇总

## Gradle `distributionUrl` 配置示例：

* **原始地址:**
    `distributionUrl=https\://services.gradle.org/distributions/gradle-8.8-bin.zip`

* **腾讯云镜像:**
    `distributionUrl=https\://mirrors.cloud.tencent.com/gradle/gradle-7.5-all.zip`

* **阿里云镜像:**
    `distributionUrl=https\://mirrors.aliyun.com/macports/distfiles/gradle/gradle-7.6.3-all.zip`

## Gradle 发行版手动下载链接：

* **腾讯云镜像:**
    * https://mirrors.cloud.tencent.com/gradle/gradle-7.5-bin.zip
    * https://mirrors.cloud.tencent.com/gradle/gradle-8.10.2-bin.zip

* **阿里云镜像:**
    * https://mirrors.aliyun.com/macports/distfiles/gradle/gradle-8.10.2-bin.zip

* **华为云镜像:**
    * https://repo.huaweicloud.com/gradle/gradle-8.0-bin.zip
    * https://repo.huaweicloud.com/gradle/gradle-7.6.3-all.zip