import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as n,o as i,c as r,a as e,b as a,e as o,w as c,f as s}from"./app-ee3e8713.js";const d={},u=s('<h1 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h1><h3 id="前端框架-react-作用-代替操作-dom" tabindex="-1"><a class="header-anchor" href="#前端框架-react-作用-代替操作-dom" aria-hidden="true">#</a> 前端框架 React 作用：代替操作 DOM</h3><p>主要为了更好实现 <mark>局部刷新</mark></p><p>当用户和网站发生交互时，我们不再是简单的直接通过浏览器进行页面的跳转，而是通过 JS 中的 AJAX 直接通过 JS 向后台服务器发送请求，请求过程用户毫无感知。响应数据会通过回调函数返回给 JS，而不是直接返回给用户。JS 中收到响应数据后，在根据不同的结果通过 DOM 来完成对页面的修改。</p><p>AJAX + DOM 使得局部刷新成为了可能<br> 缺点是 SEO “Search Engine Optimization”（搜索引擎优化），不能直接检索内容，因为都是数据都是生成的，<br> 解决方法： 网站 TDK</p><ol><li>title 建议：网站名（产品名）-网站的介绍（尽量不要超过 30 个汉字）</li><li>description 建议：简要说明我们网站主要是做什么的</li><li>keywords 建议：是页面的关键词，是搜索引擎的关注点之一，最好限制为 6~8 个关键词，关键词之间用英文逗号隔开，采用关键词 1，关键词 2 的形式</li></ol><p>数据并不能直接在网页中显示。我们需要通过 DOM 将数据转换为网页的中的各种节点，<br> 一来 DOM 操作本身十分占用系统资源一不小心就会出现卡顿。二来 DOM 的 API 十分繁复，使得各种操作并不十分的优雅。换句话说，服务器的复杂度降低了，但是前端的复杂度提高了。</p><h1 id="react-简介" tabindex="-1"><a class="header-anchor" href="#react-简介" aria-hidden="true">#</a> React 简介</h1><p><strong>React</strong>  是一个用于构建用户界面的 JavaScript 库，用来为现代的网络构建用户界面。React 起源于 Facebook，由 Facebook 的软件工程师 Jordan Walke 开发，2012 年部署于 Instagram，2013 年开源。除此之外，React 还有 React Native 框架，通过它让我们可以直接使用 JavaScript 来编写原生应用。</p><h2 id="react-的特点" tabindex="-1"><a class="header-anchor" href="#react-的特点" aria-hidden="true">#</a> React 的特点：</h2>',10),h=e("li",null,[a("虚拟 DOM "),e("ul",null,[e("li",null,"简化 api"),e("li",null,"兼容"),e("li",null,[a("性能更好 "),e("ul",null,[e("li",null,"diff")])])])],-1),_=e("li",null,[a("基于组件 "),e("ul",null,[e("li",null,"网页拆分为组件，以组件为单位，方便复用，降低代码之间的耦合")])],-1),p=e("li",null,[a("支持服务器端渲染 "),e("ul",null,[e("li",null,"对 SEO 优化")])],-1),E=e("li",null,"快速、简单、易学",-1);function m(f,B){const l=n("RouterLink");return i(),r("div",null,[u,e("ul",null,[h,e("li",null,[a("声明式 "),e("ul",null,[e("li",null,[o(l,{to:"/note/%E5%A3%B0%E6%98%8E%E5%BC%8F%E7%BC%96%E7%A8%8B%E5%92%8C%E5%91%BD%E4%BB%A4%E5%BC%8F%E7%BC%96%E7%A8%8B%E7%9A%84%E6%AF%94%E8%BE%83.html"},{default:c(()=>[a("声明式编程和命令式编程的比较")]),_:1})])])]),_,p,E])])}const b=t(d,[["render",m],["__file","08-React简介.html.vue"]]);export{b as default};
