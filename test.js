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
    "https://raw.githubusercontent.com/bhimgouda/test/main/002-Value%20Types/README.md"
  );

  console.log(markdownToJson(data));

  function markdownToJson(markdown) {
    const lines = markdown.split("\n");
    let jsonData = {};
    let currentSection = "";

    lines.forEach((line) => {
      // Remove leading and trailing whitespaces
      line = line.trim();

      if (line.startsWith("# ")) {
        // Extract section name
        currentSection = line.replace(/^#+\s*/, "").trim();
        if (currentSection === "Hello World") {
          jsonData[currentSection] = {};
        } else if (currentSection === "Tasks") {
          jsonData[currentSection] = [];
        }
      } else if (currentSection === "Tasks" && line.match(/^\d+\./)) {
        // Extract task details
        const taskNumber = line.match(/^\d+/)[0];
        const taskName = line.replace(/^\d+\.\s*/, "");
        jsonData[currentSection].push({ number: taskNumber, name: taskName });
      } else if (
        currentSection === "Start Code" ||
        currentSection === "End Code"
      ) {
        // Extract code blocks
        if (!jsonData[currentSection]) {
          jsonData[currentSection] = [];
        }
        if (line.startsWith("```")) {
          // Start of code block
          jsonData[currentSection].push("");
        } else if (!line.startsWith("```")) {
          // Inside code block
          const lastIndex = jsonData[currentSection].length - 1;
          jsonData[currentSection][lastIndex] += line + "\n";
        }
      } else if (currentSection === "Extra Details" && line.trim() !== "") {
        // Extract extra details
        const parts = line.split("=").map((part) => part.trim());
        jsonData[parts[0]] = parts[1];
      }
    });

    return jsonData;
  }
};

test();

// function htmlToJson(html) {
//   const json = {};
//   const dom = new JSDOM(html);

//   const selected = dom.window.document.querySelectorAll("");

//   console.log(selected);
// }

// console.log(htmlToJson(html));
