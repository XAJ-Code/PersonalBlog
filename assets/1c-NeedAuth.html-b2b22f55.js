import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as t}from"./app-ee3e8713.js";const p={},e=t(`<h1 id="_01c-needauth" tabindex="-1"><a class="header-anchor" href="#_01c-needauth" aria-hidden="true">#</a> 01c-NeedAuth</h1><p>简易版的 路由守卫，没有权限就重定向</p><p>在需要权限的页面，用该组件 包裹起来</p><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>useSelector<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;react-redux&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>Navigate<span class="token punctuation">,</span> useLocation<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;react-router-dom&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">NeedAuth</span> <span class="token operator">=</span> <span class="token parameter">props</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> auth <span class="token operator">=</span> <span class="token function">useSelector</span><span class="token punctuation">(</span><span class="token parameter">state</span> <span class="token operator">=&gt;</span> state<span class="token punctuation">.</span>auth<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//保存当前路径</span>
    <span class="token keyword">const</span> location <span class="token operator">=</span> <span class="token function">useLocation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    
    <span class="token keyword">return</span> auth<span class="token punctuation">.</span>isLogged <span class="token operator">?</span>
        props<span class="token punctuation">.</span>children <span class="token operator">:</span>
        <span class="token comment">//没有登录就返回到之前的页面 重定向标签</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Navigate</span></span>
            <span class="token attr-name">to</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token string">&quot;/auth-form&quot;</span><span class="token punctuation">}</span></span>
            <span class="token attr-name">replace</span>
            <span class="token comment">//设置跳转前的路径位置</span>
            <span class="token attr-name">state</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token literal-property property">preLocation</span><span class="token operator">:</span> location<span class="token punctuation">}</span><span class="token punctuation">}</span></span>
        <span class="token punctuation">/&gt;</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> NeedAuth<span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h2><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Layout</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Routes</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Route</span></span> <span class="token attr-name">path</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">}</span></span> <span class="token attr-name">element</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">HomePage</span></span><span class="token punctuation">/&gt;</span></span><span class="token punctuation">}</span></span><span class="token punctuation">/&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Route</span></span> <span class="token attr-name">path</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token string">&quot;profile&quot;</span><span class="token punctuation">}</span></span> <span class="token attr-name">element</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">NeedAuth</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">ProfilePage</span></span><span class="token punctuation">/&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">NeedAuth</span></span><span class="token punctuation">&gt;</span></span><span class="token punctuation">}</span></span><span class="token punctuation">/&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Route</span></span> <span class="token attr-name">path</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token string">&quot;auth-form&quot;</span><span class="token punctuation">}</span></span> <span class="token attr-name">element</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">AuthPage</span></span><span class="token punctuation">/&gt;</span></span><span class="token punctuation">}</span></span><span class="token punctuation">/&gt;</span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Routes</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Layout</span></span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),c=[e];function o(l,u){return s(),a("div",null,c)}const r=n(p,[["render",o],["__file","1c-NeedAuth.html.vue"]]);export{r as default};
