import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as e}from"./app-ee3e8713.js";const t={},p=e(`<p>三斜线指令是包含单个 XML 标签的单行注释。 注释的内容会做为编译器指令使用。</p><p>三斜线指令仅可放在包含它的文件的最顶端。 一个三斜线指令的前面只能出现单行或多行注释，这包括其它的三斜线指令。 如果它们出现在一个语句或声明之后，那么它们会被当做普通的单行注释，并且不具有特殊的涵义。</p><p><code>/// &lt;reference path=&quot;...&quot; /&gt;</code> 指令是三斜线指令中最常见的一种。<br> 它用于声明文件间的 <mark>依赖</mark>。</p><p>三斜线引用告诉编译器在编译过程中要引入的额外的文件。</p><p>你也可以把它理解能 import，它可以告诉编译器在编译过程中要引入的额外的文件</p><p>例如 a.ts</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">namespace</span> <span class="token constant">A</span> <span class="token punctuation">{</span>
    <span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">fn</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token string">&#39;a&#39;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>b.ts</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">namespace</span> <span class="token constant">A</span> <span class="token punctuation">{</span>
    <span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">fn2</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token string">&#39;b&#39;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>index.ts</p><p>引入之后直接可以使用变量 A</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">///&lt;reference path=&quot;./index2.ts&quot; /&gt;</span>
<span class="token comment">///&lt;reference path=&quot;./index3.ts&quot; /&gt;</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">A</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="声明文件引入" tabindex="-1"><a class="header-anchor" href="#声明文件引入" aria-hidden="true">#</a> 声明文件引入</h2><p>例如，把 <code>/// &lt;reference types=&quot;node&quot; /&gt;</code>引入到声明文件，表明这个文件使用了 <code>@types/node/index.d.ts</code> 里面声明的名字； 并且，这个包需要在编译阶段与声明文件一起被包含进来。</p><p>仅当在你需要写一个 d.ts 文件时才使用这个指令。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">///&lt;reference types=&quot;node&quot; /&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意事项：</p><p>如果你在配置文件 配置了 noResolve 或者自身调用自身文件会报错</p>`,18),c=[p];function o(i,l){return s(),a("div",null,c)}const u=n(t,[["render",o],["__file","12-三斜线指令.html.vue"]]);export{u as default};
