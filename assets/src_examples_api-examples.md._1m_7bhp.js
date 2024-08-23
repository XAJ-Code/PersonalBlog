import{u as h,c as p,j as s,t as i,k as e,a4 as k,a,o as r}from"./chunks/framework.DpC1ZpOZ.js";const d=k(`<h1 id="运行时api示例" tabindex="-1">运行时API示例 <a class="header-anchor" href="#运行时api示例" aria-label="Permalink to &quot;运行时API示例&quot;">​</a></h1><p>本页演示了VitePress提供的一些运行时API的用法。</p><p>该<code>useData（）</code> API可用于访问当前页面的网站、主题和页面数据。它在“.md”和“.vue”文件中都有效：</p><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> setup</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { useData } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vitepress&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">theme</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">page</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">frontmatter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> useData</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">## Results</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">### Theme Data</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">pre</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;{{ theme }}&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">pre</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">### Page Data</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">pre</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;{{ page }}&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">pre</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">### Page Frontmatter</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">pre</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;{{ frontmatter }}&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">pre</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h2 id="输出结果" tabindex="-1">输出结果 <a class="header-anchor" href="#输出结果" aria-label="Permalink to &quot;输出结果&quot;">​</a></h2><h3 id="主题数据" tabindex="-1">主题数据 <a class="header-anchor" href="#主题数据" aria-label="Permalink to &quot;主题数据&quot;">​</a></h3>`,6),E=s("h3",{id:"页面数据",tabindex:"-1"},[a("页面数据 "),s("a",{class:"header-anchor",href:"#页面数据","aria-label":'Permalink to "页面数据"'},"​")],-1),o=s("h3",{id:"页面前置数据",tabindex:"-1"},[a("页面前置数据 "),s("a",{class:"header-anchor",href:"#页面前置数据","aria-label":'Permalink to "页面前置数据"'},"​")],-1),g=s("h2",{id:"more",tabindex:"-1"},[a("More "),s("a",{class:"header-anchor",href:"#more","aria-label":'Permalink to "More"'},"​")],-1),c=s("p",null,[a("更多请查看文档 "),s("a",{href:"https://vitepress.dev/reference/runtime-api#usedata",target:"_blank",rel:"noreferrer"},"full list of runtime APIs"),a(".")],-1),F=JSON.parse('{"title":"运行时API示例","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"src/examples/api-examples.md","filePath":"src/examples/api-examples.md"}'),y={name:"src/examples/api-examples.md"},A=Object.assign(y,{setup(m){const{site:u,theme:t,page:n,frontmatter:l}=h();return(_,f)=>(r(),p("div",null,[d,s("pre",null,i(e(t)),1),E,s("pre",null,i(e(n)),1),o,s("pre",null,i(e(l)),1),g,c]))}});export{F as __pageData,A as default};
