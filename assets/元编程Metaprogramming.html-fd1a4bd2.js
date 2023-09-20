const a=JSON.parse(`{"key":"v-5d243e8b","path":"/note/%E5%85%83%E7%BC%96%E7%A8%8BMetaprogramming.html","title":"3e-元编程Metaprogramming","lang":"zh-CN","frontmatter":{"title":"3e-元编程Metaprogramming","updated":"2023-05-13 22:56","description":"元编程（英语：Metaprogramming，又译超编程，是指某类计算机程序的编写，这类计算机程序编写或者操纵其它程序（或者自身）作为它们的数据，或者在运行时完成部分本应在编译时完成的工作 一段代码来理解元编程 #!/bin/bash # metaprogram echo '#!/bin/bash' &gt;program for ((I=1; I&lt;=1024; I++)) do echo \\"echo $I\\" &gt;&gt;program done chmod +x program","head":[["meta",{"property":"og:url","content":"https://huxzhi.github.io/note/%E5%85%83%E7%BC%96%E7%A8%8BMetaprogramming.html"}],["meta",{"property":"og:site_name","content":"Huxzhiの小站"}],["meta",{"property":"og:title","content":"3e-元编程Metaprogramming"}],["meta",{"property":"og:description","content":"元编程（英语：Metaprogramming，又译超编程，是指某类计算机程序的编写，这类计算机程序编写或者操纵其它程序（或者自身）作为它们的数据，或者在运行时完成部分本应在编译时完成的工作 一段代码来理解元编程 #!/bin/bash # metaprogram echo '#!/bin/bash' &gt;program for ((I=1; I&lt;=1024; I++)) do echo \\"echo $I\\" &gt;&gt;program done chmod +x program"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-19T06:11:13.000Z"}],["meta",{"property":"article:author","content":"Huxzhi"}],["meta",{"property":"article:modified_time","content":"2023-09-19T06:11:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"3e-元编程Metaprogramming\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-19T06:11:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Huxzhi\\",\\"url\\":\\"https://huxzhi.fun\\"}]}"]]},"headers":[],"git":{"createdTime":1695103873000,"updatedTime":1695103873000,"contributors":[{"name":"张伟竣","email":"2938795170@qq.com","commits":1}]},"readingTime":{"minutes":0.75,"words":226},"filePathRelative":"note/元编程Metaprogramming.md","localizedDate":"2023年9月19日","excerpt":"<ul>\\n<li><strong>元编程（英语：Metaprogramming</strong>，又译超编程，是指某类计算机程序的编写，这类计算机程序编写或者操纵其它程序（或者自身）作为它们的数据，或者在运行时完成部分本应在编译时完成的工作</li>\\n</ul>\\n<p>一段代码来理解元编程</p>\\n<div class=\\"language-bash line-numbers-mode\\" data-ext=\\"sh\\"><pre class=\\"language-bash\\"><code><span class=\\"token shebang important\\">#!/bin/bash</span>\\n<span class=\\"token comment\\"># metaprogram</span>\\n<span class=\\"token builtin class-name\\">echo</span> <span class=\\"token string\\">'#!/bin/bash'</span> <span class=\\"token operator\\">&gt;</span>program\\n<span class=\\"token keyword\\">for</span> <span class=\\"token variable\\"><span class=\\"token punctuation\\">((</span>I<span class=\\"token operator\\">=</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span> I<span class=\\"token operator\\">&lt;=</span><span class=\\"token number\\">1024</span><span class=\\"token punctuation\\">;</span> I<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">))</span></span> <span class=\\"token keyword\\">do</span>\\n    <span class=\\"token builtin class-name\\">echo</span> <span class=\\"token string\\">\\"echo <span class=\\"token variable\\">$I</span>\\"</span> <span class=\\"token operator\\">&gt;&gt;</span>program\\n<span class=\\"token keyword\\">done</span>\\n<span class=\\"token function\\">chmod</span> +x program\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":{"author":"Huxzhi"},"autoDesc":true}`);export{a as data};
