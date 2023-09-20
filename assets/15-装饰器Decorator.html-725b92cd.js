const t=JSON.parse('{"key":"v-76fef3ae","path":"/code/language/typescript/%E5%B0%8F%E6%BB%A1TypeScript%E5%9F%BA%E7%A1%80%E6%95%99%E5%AD%A6/15-%E8%A3%85%E9%A5%B0%E5%99%A8Decorator.html","title":"15-装饰器Decorator","lang":"zh-CN","frontmatter":{"title":"15-装饰器Decorator","updated":"2023-05-13 22:56","description":"Decorator&nbsp; 装饰器 是一项实验性特性 在未来的版本中可能会发生改变 它们不仅增加了代码的可读性，清晰地表达了意图，而且提供一种方便的手段，增加或修改类的功能 类似 Java 注解 若要启用实验性的装饰器特性，你必须在命令行或 tsconfig.json 里启用编译器选项 一共有四种 declare type ClassDecorator = &lt;TFunction extends Function&gt;(target: TFunction) =&gt; TFunction | void; declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) =&gt; void; declare type MethodDecorator = &lt;T&gt;(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor&lt;T&gt;) =&gt; TypedPropertyDescriptor&lt;T&gt; | void; declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) =&gt; void;","head":[["meta",{"property":"og:url","content":"https://huxzhi.github.io/code/language/typescript/%E5%B0%8F%E6%BB%A1TypeScript%E5%9F%BA%E7%A1%80%E6%95%99%E5%AD%A6/15-%E8%A3%85%E9%A5%B0%E5%99%A8Decorator.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"15-装饰器Decorator"}],["meta",{"property":"og:description","content":"Decorator&nbsp; 装饰器 是一项实验性特性 在未来的版本中可能会发生改变 它们不仅增加了代码的可读性，清晰地表达了意图，而且提供一种方便的手段，增加或修改类的功能 类似 Java 注解 若要启用实验性的装饰器特性，你必须在命令行或 tsconfig.json 里启用编译器选项 一共有四种 declare type ClassDecorator = &lt;TFunction extends Function&gt;(target: TFunction) =&gt; TFunction | void; declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) =&gt; void; declare type MethodDecorator = &lt;T&gt;(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor&lt;T&gt;) =&gt; TypedPropertyDescriptor&lt;T&gt; | void; declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) =&gt; void;"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://huxzhi.github.io/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-19T06:11:13.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"15-装饰器Decorator"}],["meta",{"property":"article:author","content":"Huxzhi"}],["meta",{"property":"article:modified_time","content":"2023-09-19T06:11:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"15-装饰器Decorator\\",\\"image\\":[\\"https://huxzhi.github.io/\\"],\\"dateModified\\":\\"2023-09-19T06:11:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Huxzhi\\",\\"url\\":\\"https://huxzhi.fun\\"}]}"]]},"headers":[{"level":2,"title":"Decorator  装饰器 是一项实验性特性","slug":"decorator-装饰器-是一项实验性特性","link":"#decorator-装饰器-是一项实验性特性","children":[]},{"level":2,"title":"ClassDecorator 类装饰器","slug":"classdecorator-类装饰器","link":"#classdecorator-类装饰器","children":[{"level":3,"title":"向下兼容","slug":"向下兼容","link":"#向下兼容","children":[]}]},{"level":2,"title":"装饰器工厂（可以传参数）","slug":"装饰器工厂-可以传参数","link":"#装饰器工厂-可以传参数","children":[]},{"level":2,"title":"装饰器组合","slug":"装饰器组合","link":"#装饰器组合","children":[]},{"level":2,"title":"MethodDecorator 方法装饰器","slug":"methoddecorator-方法装饰器","link":"#methoddecorator-方法装饰器","children":[]},{"level":2,"title":"PropertyDecorator 属性装饰器","slug":"propertydecorator-属性装饰器","link":"#propertydecorator-属性装饰器","children":[]},{"level":2,"title":"ParameterDecorator 参数装饰器","slug":"parameterdecorator-参数装饰器","link":"#parameterdecorator-参数装饰器","children":[]}],"git":{"createdTime":1695103873000,"updatedTime":1695103873000,"contributors":[{"name":"张伟竣","email":"2938795170@qq.com","commits":1}]},"readingTime":{"minutes":2.38,"words":715},"filePathRelative":"code/language/typescript/小满TypeScript基础教学/15-装饰器Decorator.md","localizedDate":"2023年9月19日","excerpt":"<h2> Decorator&nbsp; 装饰器 是一项实验性特性</h2>\\n<p>在未来的版本中可能会发生改变</p>\\n<p>它们不仅增加了代码的可读性，清晰地表达了意图，而且提供一种方便的手段，增加或修改类的功能</p>\\n<p><mark>类似 Java 注解</mark></p>\\n<p>若要启用实验性的装饰器特性，你必须在命令行或 <code>tsconfig.json</code> 里启用编译器选项<br>\\n</p>\\n<p>一共有四种</p>\\n<div class=\\"language-typescript line-numbers-mode\\" data-ext=\\"ts\\"><pre class=\\"language-typescript\\"><code><span class=\\"token keyword\\">declare</span> <span class=\\"token keyword\\">type</span> <span class=\\"token class-name\\">ClassDecorator</span> <span class=\\"token operator\\">=</span> <span class=\\"token operator\\">&lt;</span>TFunction <span class=\\"token keyword\\">extends</span> <span class=\\"token class-name\\"><span class=\\"token builtin\\">Function</span></span><span class=\\"token operator\\">&gt;</span><span class=\\"token punctuation\\">(</span>target<span class=\\"token operator\\">:</span> TFunction<span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> TFunction <span class=\\"token operator\\">|</span> <span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">declare</span> <span class=\\"token keyword\\">type</span> <span class=\\"token class-name\\">PropertyDecorator</span> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span>target<span class=\\"token operator\\">:</span> Object<span class=\\"token punctuation\\">,</span> propertyKey<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">string</span> <span class=\\"token operator\\">|</span> <span class=\\"token builtin\\">symbol</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> <span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">declare</span> <span class=\\"token keyword\\">type</span> <span class=\\"token class-name\\">MethodDecorator</span> <span class=\\"token operator\\">=</span> <span class=\\"token operator\\">&lt;</span><span class=\\"token constant\\">T</span><span class=\\"token operator\\">&gt;</span><span class=\\"token punctuation\\">(</span>target<span class=\\"token operator\\">:</span> Object<span class=\\"token punctuation\\">,</span> propertyKey<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">string</span> <span class=\\"token operator\\">|</span> <span class=\\"token builtin\\">symbol</span><span class=\\"token punctuation\\">,</span> descriptor<span class=\\"token operator\\">:</span> TypedPropertyDescriptor<span class=\\"token operator\\">&lt;</span><span class=\\"token constant\\">T</span><span class=\\"token operator\\">&gt;</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> TypedPropertyDescriptor<span class=\\"token operator\\">&lt;</span><span class=\\"token constant\\">T</span><span class=\\"token operator\\">&gt;</span> <span class=\\"token operator\\">|</span> <span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">declare</span> <span class=\\"token keyword\\">type</span> <span class=\\"token class-name\\">ParameterDecorator</span> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span>target<span class=\\"token operator\\">:</span> Object<span class=\\"token punctuation\\">,</span> propertyKey<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">string</span> <span class=\\"token operator\\">|</span> <span class=\\"token builtin\\">symbol</span><span class=\\"token punctuation\\">,</span> parameterIndex<span class=\\"token operator\\">:</span> <span class=\\"token builtin\\">number</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> <span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{"author":"Huxzhi"},"autoDesc":true}');export{t as data};
