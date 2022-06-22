import { useRef, useEffect } from "react";

interface ExecutionProps {
  code: string;
  bundlerError: string;
}

const CodeExecution: React.FC<ExecutionProps> = (props) => {
  const { code, bundlerError } = props;
  const iframeRef = useRef() as React.MutableRefObject<HTMLIFrameElement>;

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
      const handleError = (err) => {
        console.error(err);
        const root = document.querySelector("#root");
        root.innerHTML = '<div style="color: red;"><h4>Runtime error</h4>' + err + '</div>'
      }

      window.addEventListener("error", (event) => {
        event.preventDefault();
        console.warn("uh oh!");
        handleError(event.error);
      });
      
      window.addEventListener("message", (event) => {
        try {
          eval(event.data);
        } catch (err) {
          throw err;
        }
      }, false);
    </script>
  </body>
</html>
  `;

  useEffect(() => {
    console.log(code);
    if (iframeRef && iframeRef.current) {
      iframeRef.current.srcdoc = html;
      setTimeout(() => {
        iframeRef.current.contentWindow?.postMessage(code, "*");
      }, 20);
    }
  }, [code, html]);

  return (
    <div className="code-execution-wrapper relative h-full flex-grow bg-white">
      {!bundlerError && (
        <iframe
          className="h-full w-full"
          ref={iframeRef}
          title="code-execution"
          srcDoc={html}
          sandbox="allow-scripts"
        />
      )}
      {bundlerError && (
        <div className="h-full w-full p-4 text-red-600">{bundlerError}</div>
      )}
    </div>
  );
};

export default CodeExecution;
