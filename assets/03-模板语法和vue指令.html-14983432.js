const t=JSON.parse(`{"key":"v-b7286090","path":"/code/vue/vue3/03-%E6%A8%A1%E6%9D%BF%E8%AF%AD%E6%B3%95%E5%92%8Cvue%E6%8C%87%E4%BB%A4.html","title":"03-模板语法和vue指令","lang":"zh-CN","frontmatter":{"category":"vue3","title":"03-模板语法和vue指令","updated":"2023-05-13 22:56","description":"模板语法 在 script 声明一个变量可以直接在 template 使用用法为{{ 变量名称 }} &lt;template&gt; &lt;div&gt;{{ message1 }}&lt;/div&gt; &lt;div&gt;{{ message2 == 0 ? '我是小满0' : '我不是小满other' }}&lt;/div&gt; &lt;!-- 条件运算 --&gt; &lt;div&gt;{{ message2 + 1 }}&lt;/div&gt;&lt;!-- 运算 --&gt; &lt;div&gt;{{ message3.split('，') }}&lt;/div&gt;&lt;!-- 操作 API --&gt; &lt;/template&gt; &lt;script setup lang=\\"ts\\"&gt; const message1 = \\"我是小满\\" const message2:number = 1 const message3:string = \\"我，是，小，满\\" &lt;/script&gt;","head":[["meta",{"property":"og:url","content":"https://huxzhi.github.io/code/vue/vue3/03-%E6%A8%A1%E6%9D%BF%E8%AF%AD%E6%B3%95%E5%92%8Cvue%E6%8C%87%E4%BB%A4.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"03-模板语法和vue指令"}],["meta",{"property":"og:description","content":"模板语法 在 script 声明一个变量可以直接在 template 使用用法为{{ 变量名称 }} &lt;template&gt; &lt;div&gt;{{ message1 }}&lt;/div&gt; &lt;div&gt;{{ message2 == 0 ? '我是小满0' : '我不是小满other' }}&lt;/div&gt; &lt;!-- 条件运算 --&gt; &lt;div&gt;{{ message2 + 1 }}&lt;/div&gt;&lt;!-- 运算 --&gt; &lt;div&gt;{{ message3.split('，') }}&lt;/div&gt;&lt;!-- 操作 API --&gt; &lt;/template&gt; &lt;script setup lang=\\"ts\\"&gt; const message1 = \\"我是小满\\" const message2:number = 1 const message3:string = \\"我，是，小，满\\" &lt;/script&gt;"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-19T06:11:13.000Z"}],["meta",{"property":"article:author","content":"Huxzhi"}],["meta",{"property":"article:modified_time","content":"2023-09-19T06:11:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"03-模板语法和vue指令\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-19T06:11:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Huxzhi\\",\\"url\\":\\"https://huxzhi.fun\\"}]}"]]},"headers":[],"git":{"createdTime":1695103873000,"updatedTime":1695103873000,"contributors":[{"name":"张伟竣","email":"2938795170@qq.com","commits":1}]},"readingTime":{"minutes":1.59,"words":478},"filePathRelative":"code/vue/vue3/03-模板语法和vue指令.md","localizedDate":"2023年9月19日","excerpt":"<h1> 模板语法</h1>\\n<p>在 script 声明一个变量可以直接在 <code>template</code> 使用用法为<code>{{ 变量名称 }}</code></p>\\n<div class=\\"language-vue line-numbers-mode\\" data-ext=\\"vue\\"><pre class=\\"language-vue\\"><code><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>template</span><span class=\\"token punctuation\\">&gt;</span></span>\\n  <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>div</span><span class=\\"token punctuation\\">&gt;</span></span>{{ message1 }}<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>div</span><span class=\\"token punctuation\\">&gt;</span></span>\\n  <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>div</span><span class=\\"token punctuation\\">&gt;</span></span>{{ message2 == 0 ? '我是小满0' : '我不是小满other' }}<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>div</span><span class=\\"token punctuation\\">&gt;</span></span> <span class=\\"token comment\\">&lt;!-- 条件运算 --&gt;</span>\\n  <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>div</span><span class=\\"token punctuation\\">&gt;</span></span>{{ message2 + 1 }}<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>div</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token comment\\">&lt;!-- 运算 --&gt;</span>\\n  <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>div</span><span class=\\"token punctuation\\">&gt;</span></span>{{ message3.split('，') }}<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>div</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token comment\\">&lt;!-- 操作 API --&gt;</span>\\n<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>template</span><span class=\\"token punctuation\\">&gt;</span></span>\\n\\n<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>script</span> <span class=\\"token attr-name\\">setup</span> <span class=\\"token attr-name\\">lang</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>ts<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token script\\"><span class=\\"token language-javascript\\">\\n<span class=\\"token keyword\\">const</span> message1 <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"我是小满\\"</span>\\n<span class=\\"token keyword\\">const</span> <span class=\\"token literal-property property\\">message2</span><span class=\\"token operator\\">:</span>number <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span>\\n<span class=\\"token keyword\\">const</span> <span class=\\"token literal-property property\\">message3</span><span class=\\"token operator\\">:</span>string <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"我，是，小，满\\"</span>\\n</span></span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>script</span><span class=\\"token punctuation\\">&gt;</span></span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{"author":"Huxzhi"},"autoDesc":true}`);export{t as data};
