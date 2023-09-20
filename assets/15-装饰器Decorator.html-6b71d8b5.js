import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as c,c as l,a as s,b as n,e as t,f as e}from"./app-ee3e8713.js";const i="/assets/Pasted-image-20221231172559-37a400b1.png",r={},u=e('<h2 id="decorator-装饰器-是一项实验性特性" tabindex="-1"><a class="header-anchor" href="#decorator-装饰器-是一项实验性特性" aria-hidden="true">#</a> Decorator  装饰器 是一项实验性特性</h2><p>在未来的版本中可能会发生改变</p><p>它们不仅增加了代码的可读性，清晰地表达了意图，而且提供一种方便的手段，增加或修改类的功能</p><p><mark>类似 Java 注解</mark></p><p>若要启用实验性的装饰器特性，你必须在命令行或 <code>tsconfig.json</code> 里启用编译器选项<br><img src="'+i+`" alt="" loading="lazy"></p><p>一共有四种</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">declare</span> <span class="token keyword">type</span> <span class="token class-name">ClassDecorator</span> <span class="token operator">=</span> <span class="token operator">&lt;</span>TFunction <span class="token keyword">extends</span> <span class="token class-name"><span class="token builtin">Function</span></span><span class="token operator">&gt;</span><span class="token punctuation">(</span>target<span class="token operator">:</span> TFunction<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> TFunction <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span>

<span class="token keyword">declare</span> <span class="token keyword">type</span> <span class="token class-name">PropertyDecorator</span> <span class="token operator">=</span> <span class="token punctuation">(</span>target<span class="token operator">:</span> Object<span class="token punctuation">,</span> propertyKey<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">symbol</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">;</span>

<span class="token keyword">declare</span> <span class="token keyword">type</span> <span class="token class-name">MethodDecorator</span> <span class="token operator">=</span> <span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>target<span class="token operator">:</span> Object<span class="token punctuation">,</span> propertyKey<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">symbol</span><span class="token punctuation">,</span> descriptor<span class="token operator">:</span> TypedPropertyDescriptor<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> TypedPropertyDescriptor<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token keyword">void</span><span class="token punctuation">;</span>

<span class="token keyword">declare</span> <span class="token keyword">type</span> <span class="token class-name">ParameterDecorator</span> <span class="token operator">=</span> <span class="token punctuation">(</span>target<span class="token operator">:</span> Object<span class="token punctuation">,</span> propertyKey<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">symbol</span><span class="token punctuation">,</span> parameterIndex<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="classdecorator-类装饰器" tabindex="-1"><a class="header-anchor" href="#classdecorator-类装饰器" aria-hidden="true">#</a> ClassDecorator 类装饰器</h2>`,8),d=s("em",null,"装饰器",-1),k={href:"https://www.tslang.cn/docs/handbook/decorators.html#class-decorators",title:"类声明",target:"_blank",rel:"noopener noreferrer"},v={href:"https://www.tslang.cn/docs/handbook/decorators.html#method-decorators",title:"方法",target:"_blank",rel:"noopener noreferrer"},m={href:"https://www.tslang.cn/docs/handbook/decorators.html#accessor-decorators",title:"访问符",target:"_blank",rel:"noopener noreferrer"},b={href:"https://www.tslang.cn/docs/handbook/decorators.html#property-decorators",title:"属性",target:"_blank",rel:"noopener noreferrer"},g={href:"https://www.tslang.cn/docs/handbook/decorators.html#parameter-decorators",title:"参数",target:"_blank",rel:"noopener noreferrer"},h=e(`<p>首先定义一个类</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义一个类装饰器函数   他会把 ClassA 的构造函数传入你的 watcher 函数当做第一个参数</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> watcher<span class="token operator">:</span> <span class="token function-variable function">ClassDecorator</span> <span class="token operator">=</span> <span class="token punctuation">(</span>target<span class="token operator">:</span> <span class="token builtin">Function</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    target<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>getParams <span class="token operator">=</span> <span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>params<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span><span class="token operator">:</span><span class="token constant">T</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> <span class="token comment">//给目标类增加一个函数</span>
        <span class="token keyword">return</span> params
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用的时候 直接通过 <code>@函数名</code> 使用</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token decorator"><span class="token at operator">@</span><span class="token function">watcher</span></span>
<span class="token keyword">class</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="向下兼容" tabindex="-1"><a class="header-anchor" href="#向下兼容" aria-hidden="true">#</a> 向下兼容</h3><p>这种方式也可以</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token function">watcher</span><span class="token punctuation">(</span><span class="token constant">A</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>验证</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">A</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">(</span>a <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getParams</span><span class="token punctuation">(</span><span class="token string">&#39;123&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="装饰器工厂-可以传参数" tabindex="-1"><a class="header-anchor" href="#装饰器工厂-可以传参数" aria-hidden="true">#</a> 装饰器工厂（可以传参数）</h2><p>其实也就是一个 高阶函数   外层的函数接受值 里层的函数最终接受类的构造函数</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> watcher <span class="token operator">=</span> <span class="token punctuation">(</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> ClassDecorator <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>target<span class="token operator">:</span> <span class="token builtin">Function</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> <span class="token comment">//高阶函数，返回 类装饰器函数</span>
        target<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>getParams <span class="token operator">=</span> <span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>params<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">T</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> params
        <span class="token punctuation">}</span>
        target<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>getOptions <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> name
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">watcher</span></span><span class="token punctuation">(</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">A</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">(</span>a <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getParams</span><span class="token punctuation">(</span><span class="token string">&#39;123&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="装饰器组合" tabindex="-1"><a class="header-anchor" href="#装饰器组合" aria-hidden="true">#</a> 装饰器组合</h2><p>就是可以使用多个装饰器</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token decorator"><span class="token at operator">@</span><span class="token function">watcher2</span></span><span class="token punctuation">(</span><span class="token string">&#39;name2&#39;</span><span class="token punctuation">)</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">watcher</span></span><span class="token punctuation">(</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="methoddecorator-方法装饰器" tabindex="-1"><a class="header-anchor" href="#methoddecorator-方法装饰器" aria-hidden="true">#</a> MethodDecorator 方法装饰器</h2><p>返回三个参数</p><ol><li>对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。</li><li>成员的名字。</li><li>成员的 <em>属性描述符</em> 。</li></ol><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token punctuation">[</span>
  <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token string">&#39;setParasm&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    value<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token builtin">Function</span><span class="token operator">:</span> setParasm<span class="token punctuation">]</span><span class="token punctuation">,</span>
    writable<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    enumerable<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    configurable<span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> met<span class="token operator">:</span><span class="token function-variable function">MethodDecorator</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
    <span class="token decorator"><span class="token at operator">@</span><span class="token function">met</span></span>
    <span class="token function">getName</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span><span class="token builtin">string</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&#39;小满&#39;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">A</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="propertydecorator-属性装饰器" tabindex="-1"><a class="header-anchor" href="#propertydecorator-属性装饰器" aria-hidden="true">#</a> PropertyDecorator 属性装饰器</h2><p>返回两个参数</p><ol><li>对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。</li><li>属性的名字。</li></ol><p><code>[ {}, &#39;name&#39;, undefined ]</code></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> met<span class="token operator">:</span><span class="token function-variable function">PropertyDecorator</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span>
    <span class="token decorator"><span class="token at operator">@</span><span class="token function">met</span></span>
    name<span class="token operator">:</span><span class="token builtin">string</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

<span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">A</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="parameterdecorator-参数装饰器" tabindex="-1"><a class="header-anchor" href="#parameterdecorator-参数装饰器" aria-hidden="true">#</a> ParameterDecorator 参数装饰器</h2><p>返回三个参数</p><ol><li>对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。</li><li>成员的名字。</li><li>参数在函数参数列表中的索引。</li></ol><p><code>[ {}, &#39;setParasm&#39;, 0 ]</code></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> met<span class="token operator">:</span><span class="token function-variable function">ParameterDecorator</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
    <span class="token function">setParasm</span> <span class="token punctuation">(</span><span class="token decorator"><span class="token at operator">@</span><span class="token function">met</span></span> name<span class="token operator">:</span><span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">&#39;213&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">A</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,32);function y(w,f){const a=o("ExternalLinkIcon");return c(),l("div",null,[u,s("p",null,[d,n(" 是一种特殊类型的声明，它能够被附加到"),s("a",k,[n("类声明"),t(a)]),n("，"),s("a",v,[n("方法"),t(a)]),n("， "),s("a",m,[n("访问符"),t(a)]),n("，"),s("a",b,[n("属性"),t(a)]),n("或"),s("a",g,[n("参数"),t(a)]),n("上。")]),h])}const D=p(r,[["render",y],["__file","15-装饰器Decorator.html.vue"]]);export{D as default};
