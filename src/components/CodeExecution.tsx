import { useRef, useEffect } from "react";

interface ExecutionProps {
  code: string;
}

const CodeExecution: React.FC<ExecutionProps> = (props) => {
  const { code } = props;
  const iframeRef = useRef<any>();

  const html = `
<html>
  <head>
    <style>
      html { background-color: white; }
      body {
        margin: 0;
      }
      html, body, div#root {
        height: 100%;
        width: 100%;
      }
      * { box-sizing: border-box; }
    </style>
  </head>
  <body style="">
    <pre style="margin: 0; position: fixed; top: 0; left: 0; opacity: 0.2;">Code preview</pre>
    <div id="root" style=""></div>
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

  useEffect(() => {
    if (iframeRef) {
      iframeRef.current.srcDoc = html;
      setTimeout(() => {
        iframeRef.current.contentWindow.postMessage(code, "*");
      }, 20);
    }
  }, [code, html]);

  return (
    <div className="code-execution-wrapper relative h-full flex-grow">
      <iframe
        className="h-full w-full"
        ref={iframeRef}
        title="code-execution"
        srcDoc={html}
        sandbox="allow-scripts"
      />
    </div>
  );
};

export default CodeExecution;
