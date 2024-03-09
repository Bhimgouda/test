const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const axios = require("axios");

const html = `
<h1 id="hello-world">Hello World</h1>
<p>Time to say Hello Coco</p>
<h2 id="tasks">Tasks</h2>
<ol>
<li><p>Check the logic name is <strong>HelloWorld</strong></p>
</li>
<li><p>Create a <strong>persistent state variable</strong> called <strong>greet</strong> and then assign it an initial value of <strong>&quot;Hello World&quot;</strong></p>
</li>
</ol>
<pre><code>    <span class="hljs-keyword">async</span> (logicDriver, expect) =&gt; {
      <span class="hljs-keyword">const</span> greet = <span class="hljs-keyword">await</span> logicDriver.persistentState.<span class="hljs-keyword">get</span>(
        <span class="hljs-string">'greet'</span>
      );
      expect(greet).to.be.equal(<span class="hljs-string">'Hello World'</span>);
    }
</code></pre><h2 id="start-code">Start Code</h2>
<pre><code>    coco HelloWorld

    <span class="hljs-keyword">state</span> persistent:
        myString String
        // Write your code here

    endpoint deployer Initialize!():
        mutate <span class="hljs-string">"My String"</span> -&gt; HelloWorld.State.myString
</code></pre><h3 id="end-code">End Code</h3>
<pre><code>    coco HelloWorld

    state persistent:
    myString String
    greet String

    endpoint deployer Initialize!():
    mutate <span class="hljs-string">"My String"</span> -&gt; HelloWorld<span class="hljs-selector-class">.State</span><span class="hljs-selector-class">.myString</span>
    mutate <span class="hljs-string">"Hello World"</span> -&gt; HelloWorld<span class="hljs-selector-class">.State</span><span class="hljs-selector-class">.greet</span>
</code></pre><h3 id="extra-details">Extra Details</h3>
<p>moduleName = HelloWorld
deployerEndpoint = Initialize!()
deployerArgs = []
points = 10
level = Amateur</p>

`;

const test = async () => {
  const { data } = await axios.get(
    "https://raw.githubusercontent.com/sarvalabs/js-moi-examples/main/README.md"
  );

  console.log(data.split("\n"));
};

test();

// function htmlToJson(html) {
//   const json = {};
//   const dom = new JSDOM(html);

//   const selected = dom.window.document.querySelectorAll("");

//   console.log(selected);
// }

// console.log(htmlToJson(html));
