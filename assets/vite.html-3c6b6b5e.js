import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as i,c,a as e,b as a,e as n,f as t}from"./app-ee3e8713.js";const p={},d=t('<h2 id="创建一个-自己的-vite" tabindex="-1"><a class="header-anchor" href="#创建一个-自己的-vite" aria-hidden="true">#</a> 创建一个 自己的 vite</h2><p>我选择了 <code>vuepress</code> 框架作为我的个人博客，主要看中这几个优点</p><ul><li>开箱即用</li><li>基于 <code>vite</code> 可以快速热更新</li></ul><h2 id="使用-vuepress-配置主题" tabindex="-1"><a class="header-anchor" href="#使用-vuepress-配置主题" aria-hidden="true">#</a> 使用 VuePress 配置主题</h2>',4),l={href:"https://theme-hope.vuejs.press/zh/cookbook/vuepress/config.html",target:"_blank",rel:"noopener noreferrer"},h=e("p",null,"好看，且可以做到 90% 的免配置",-1),u={href:"https://theme-hope.vuejs.press/zh/guide/blog/home/",target:"_blank",rel:"noopener noreferrer"},v=t('<h2 id="踩坑记录" tabindex="-1"><a class="header-anchor" href="#踩坑记录" aria-hidden="true">#</a> 踩坑记录</h2><p>虽然已经足够好用，但免不了会遇到 bug，有一些是自己不了解该主题导致的，作一下提醒</p><h3 id="基于字符串替换而不是-ast-替换" tabindex="-1"><a class="header-anchor" href="#基于字符串替换而不是-ast-替换" aria-hidden="true">#</a> 基于字符串替换而不是 <code>AST</code> 替换</h3><p><code>dev</code> 模式可以正常显示， <code>build</code> 模式不可以</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>所以不要出现如下的代码。 <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string"> </span><span class="token template-punctuation string">`</span></span>包裹是不起作用，需要 <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token template-punctuation string">`</span></span>` 整个代码块包裹\n\n<span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>env\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="图片相对地址不能空格" tabindex="-1"><a class="header-anchor" href="#图片相对地址不能空格" aria-hidden="true">#</a> 图片相对地址不能空格</h3><p>哪怕是 用 %20 填充，也不行</p>',7);function m(_,k){const s=r("ExternalLinkIcon");return i(),c("div",null,[d,e("p",null,[e("a",l,[a("https://theme-hope.vuejs.press/zh/cookbook/vuepress/config.html"),n(s)])]),h,e("p",null,[a("相关配置文档请见 "),e("a",u,[a("博客主页"),n(s)]),a("。")]),v])}const g=o(p,[["render",m],["__file","vite.html.vue"]]);export{g as default};
