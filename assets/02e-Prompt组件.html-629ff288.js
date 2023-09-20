import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as t}from"./app-ee3e8713.js";const p={},e=t(`<h1 id="_02e-prompt组件" tabindex="-1"><a class="header-anchor" href="#_02e-prompt组件" aria-hidden="true">#</a> 02e-Prompt组件</h1><h1 id="prompt-组件" tabindex="-1"><a class="header-anchor" href="#prompt-组件" aria-hidden="true">#</a> Prompt 组件</h1><p>prompt 组件可以在用户离开页面前弹出提示。二次确认</p><p>属性：</p><ol><li>message 字符串/函数，设置离开前显示的提示信息</li><li>when 布尔值，设置是否显示提示</li></ol><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token keyword">const</span> <span class="token function-variable function">MyForm</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>

    <span class="token keyword">const</span> <span class="token punctuation">[</span>isPrompt<span class="token punctuation">,</span> setIsPrompt<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Prompt</span></span>
                <span class="token attr-name">when</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>isPrompt<span class="token punctuation">}</span></span>
                <span class="token attr-name">message</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token string">&quot;将要离开页面！确认吗？&quot;</span><span class="token punctuation">}</span></span><span class="token punctuation">/&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">表单</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span>
                <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>text<span class="token punctuation">&quot;</span></span>
                <span class="token attr-name">onChange</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token parameter">e</span> <span class="token operator">=&gt;</span> <span class="token function">setIsPrompt</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>length <span class="token operator">!==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span>
            <span class="token punctuation">/&gt;</span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> MyForm<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","02e-Prompt组件.html.vue"]]);export{k as default};
