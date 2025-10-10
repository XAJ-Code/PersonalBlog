import { defineConfig } from "vitepress";
import path from "node:path";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "小阿俊的博客",
  lang: "zh-CN",
  description: "代码知识点归纳",
  base: "/PersonalBlog/",
  head: [["link", { rel: "icon", href: "/PersonalBlog/favicon.ico" }]],
  vite:{
    resolve: {
      alias:{
        '@assets': path.resolve(__dirname, '../assets')
      }
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.svg",
    siteTitle: "小阿俊的博客",
    // https://vitepress.dev/reference/default-theme-config#nav
    nav: [
      { text: "首页", link: "/" },
      { text: "文档帮助", link: "/src/examples/markdown-examples" },
      { text: ".Net", link: "/src/net/dotnetStart" },
      { text: "NodeJs", link: "/src/node/nodeChapter1" },
      { text: "前端", link: "/src/webAPI/webSerial" },
      { text: "kotlin", link: "/src/kotlin/basicDataType" },
      { text: "相机", link: "/src/camera/basicData" },
    ],
    search: {
      provider: "local",
    },
    sidebar:{
      "/src/examples/": [
        {
          text: "开始",
          collapsed: false,
          items: [
            { text: "Markdown 示例", link: "/src/examples/markdown-examples" },
            { text: "运行时API 示例", link: "/src/examples/api-examples" },
            { text: "Markdown 语法", link: "/src/examples/markdown" },
          ],
        },
      ],
      "/src/net/": [
        {
          text: ".Net",
          collapsed: false,
          items: [
            { text: ".Net入门", link: "/src/net/dotnetStart" },
            { text: "ASP.NET CORE", link: "/src/net/asp.netCore" },
            { text: ".Net中的异步", link: "/src/net/async" },
            { text: "依赖注入", link: "/src/net/DI" },
            { text: "webAPI", link: "/src/net/Task" },
            { text: "文件操作", link: "/src/net/file" },
            { text: "委托", link: "/src/net/delegate" },
            { text: "原子性", link: "/src/net/interlock" },
            { text: "字符串相关操作", link: "/src/net/string" }
          ],
        },
        {
          text: ".Net MAUI相关",
          collapsed: false,
          items: [
            { text: "XAML的基本语法", link: "/src/net/maui/xaml" },
            { text: "mvvm架构", link: "/src/net/maui/mvvm" },
            { text: "线程", link: "/src/net/maui/task" },
          ],
        },
      ],
      "/src/node/": [
        {
          text: "NodeJs知识点",
          collapsed: false,
          items: [
            { text: "nodeJs第一章概述", link: "/src/node/nodeChapter1" },
            {
              text: "nodeJs第二章Bufer",
              link: "/src/node/NodeJS内置模块之buffer",
            },
            {
              text: "nodejs第三章Crypoto",
              link: "/src/node/NodeJs内置模块-crypto",
            },
            {
              text: "nodejs第四章Events",
              link: "/src/node/Node.js中的Events模块",
            },
            { text: "nodejs第五章Zlib", link: "/src/node/NodeJs-之zlib文件压缩" },
            { text: "nodejs第六章Http", link: "/src/node/NodeJs中http服务器" },
            {
              text: "nodejs第七章反向代理",
              link: "/src/node/NodeJS实现反向代理",
            },
            {
              text: "nodejs第八章动静分离",
              link: "/src/node/NodeJS实现动静分离",
            },
            {
              text: "nodejs第九章path变量",
              link: "/src/node/NodeJs之path模块",
            },
            {
              text: "nodejs第十章sqlite模块",
              link: "/src/node/NodeJs中的sqlite知识",
            }
          ],
        },
      ],
      "/src/webAPI/": [
        {
          text: "前端知识",
          collapsed: false,
          items: [
            { text: "tanStackQuery", link: "/src/webAPI/tanStackQuery" },
            { text: "web Serial串口", link: "/src/webAPI/webSerial" },
            { text: "对等依赖", link: "/src/webAPI/peerDependencies" },
            { text: "Html实体字符", link: "/src/webAPI/htmlUnicode" },
            { text: "webComponent", link: "/src/webAPI/webComponent" },
            { text: "postMessage", link: "/src/webAPI/postMessage" },
          ],
        },
        {
          text: "vue",
          collapsed: false,
          items: [
            { text: "vue的三种写法", link: "/src/webAPI/vue/jsxInVue" },
          ],
        },
        {
          text: "react",
          collapsed: false,
          items: [
            { text: "react完整知识点", link: "/src/webAPI/react/summaryReact" },
          ],
        },
        {
          text: "nuxt",
          collapsed: false,
          items: [
            { text: "nuxt基本概念", link: "/src/webAPI/nuxt/basicNuxt" },
          ],
        },
      ],
      "/src/kotlin/":[
        {
          text: "kotlin语言基础",
          collapsed: false,
          items: [
            { text: "基本概念", link: "/src/kotlin/basicConcepts" },
            { text: "基本数据类型", link: "/src/kotlin/basicDataType" },
            { text: "数组(Array)", link: "/src/kotlin/Array" },
            { text: "位运算", link: "/src/kotlin/bitOperation" },
            { text: "标识符", link: "/src/kotlin/breakAndReturn" },
            { text: "异常(Exception)", link: "/src/kotlin/Exception" },
            { text: "类(class)", link: "/src/kotlin/class" },
            { text: "lambda表达式", link: "/src/kotlin/lambda" },
            { text: "接口(Interface)", link: "/src/kotlin/interface" },
            { text: "扩展和伴生对象", link: "/src/kotlin/extend" },
            { text: "数据类", link: "/src/kotlin/dataClass" },
            { text: "密封类", link: "/src/kotlin/sealedClass" },
          ],
        },
        {
          text: "Android开发",
          collapsed: false,
          items: [
            { text: "Android环境搭建", link: "/src/kotlin/android/AndroidStduio" },
            { text: "JetPack Compose", link: "/src/kotlin/android/JetpackComponse" },
            { text: "单位基础(dp)", link: "/src/kotlin/android/unit" },
            { text: "布局组合函数", link: "/src/kotlin/android/layoutFuncion" },
            { text: "mutableStateOf(状态)", link: "/src/kotlin/android/remember" },
            { text: "modifier修饰符", link: "/src/kotlin/android/modifier" },
          ],
        }
      ],
      "/src/camera/":[
        {
          text: "相机基础知识",
          collapsed: false,
          items: [
            { text: "基本概念", link: "/src/camera/basicData" },
            { text: "ISP(图像信号处理器)", link: "/src/camera/ISP" },
          ],
        },
      ]
    },
    // sidebar: [
    //   {
    //     text: "开始",
    //     collapsed: false,
    //     items: [
    //       { text: "Markdown 示例", link: "/src/examples/markdown-examples" },
    //       { text: "运行时API 示例", link: "/src/examples/api-examples" },
    //     ],
    //   },
    //   {
    //     text: "web API合集",
    //     collapsed: false,
    //     items: [{ text: "web Serial串口", link: "/src/webAPI/webSerial" }],
    //   },
    //   {
    //     text: "NodeJs知识点",
    //     collapsed: false,
    //     items: [
    //       { text: "nodeJs第一章概述", link: "/src/node/nodeChapter1" },
    //       {
    //         text: "nodeJs第二章Bufer",
    //         link: "/src/node/NodeJS内置模块之buffer",
    //       },
    //       {
    //         text: "nodejs第三章Crypoto",
    //         link: "/src/node/NodeJs内置模块-crypto",
    //       },
    //       {
    //         text: "nodejs第四章Events",
    //         link: "/src/node/Node.js中的Events模块",
    //       },
    //       { text: "nodejs第五章Zlib", link: "/src/node/NodeJs-之zlib文件压缩" },
    //       { text: "nodejs第六章Http", link: "/src/node/NodeJs中http服务器" },
    //       {
    //         text: "nodejs第七章反向代理",
    //         link: "/src/node/NodeJS实现反向代理",
    //       },
    //       {
    //         text: "nodejs第八章动静分离",
    //         link: "/src/node/NodeJS实现动静分离",
    //       },
    //     ],
    //   },
    // ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
