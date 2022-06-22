import { useState, useRef } from "react";
import useESBuild from "./hooks/useESBuild";
import CodeEditor from "./components/CodeEditor";

const DEFAULT_INPUT = "";

function App() {
  const [input, setInput] = useState(DEFAULT_INPUT);
  const iframeRef = useRef<any>();

  const { code, bundleCode } = useESBuild(iframeRef);

  const handleSubmit = () => {
    iframeRef.current.srcDoc = html;
    bundleCode(input);
  };

  const handleResetInput = () => {
    setInput(DEFAULT_INPUT);
    bundleCode(DEFAULT_INPUT);
  };

  const html = `
      <html>
        <head></head>
        <body>
          <pre>Your code will execute here. . .</pre>
          <div id="root"></div>
          <script>
            window.addEventListener("message", (event) => {
              try {
                eval(event.data);
              } catch (err) {
                console.error(err);
                const root = document.querySelector("#root");
                root.innerHTML = '<div style="color: red;"><h4>Runtime error</h4>' + err + '</div>'
              }
            }, false);
          </script>
        </body>
      </html>
      `;

  return (
    <>
      <div>
        <div
          className="
                    m-4 h-full rounded-lg 
                    bg-slate-700 p-8 shadow-xl ring-1 
                    ring-slate-900/5
                  "
        >
          <h1 className="text-3xl font-bold text-rose-300">Gigan</h1>
          <h4 className="text-xl text-rose-300">
            Write, transpile, bundle and execute jsx? Holy crap!
          </h4>
          <div>
            <CodeEditor
              initialValue={input}
              onChange={(value) => setInput(value)}
            />
            <div className="p-4">
              <button
                className="
                font-semi-bold mr-8 rounded-sm border-2 border-transparent px-4 py-2 text-rose-300
                transition-colors duration-200 hover:border-rose-400"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="
                font-semi-bold rounded-sm border-2 border-transparent px-4 py-2 text-rose-300
                transition-colors duration-200 hover:border-rose-400"
                onClick={handleResetInput}
              >
                Reset
              </button>
            </div>
            <div className="mt-8 text-rose-300">
              <div>{code && "Transpiled code bundle"}</div>
              <div className="mt-4 mb-8 max-h-96 overflow-y-auto">
                <pre className="m-8 whitespace-pre-wrap text-rose-100">
                  {code}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="m-4">
        <iframe
          className="m4 max-h-screen w-full rounded-sm border-2"
          ref={iframeRef}
          title="code-execution"
          srcDoc={html}
          sandbox="allow-scripts"
        />
      </div>
    </>
  );
}

export default App;
