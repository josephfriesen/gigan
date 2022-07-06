import { useState, useEffect } from "react";
import useESBuild from "../hooks/useESBuild";
import CodeEditor from "./CodeEditor";
import CodeExecution from "./CodeExecution";
import Resizable from "./Resizable";

const DEFAULT_INPUT = `
import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "animate.css/animate.min.css";

const App = () => {
  console.log("i am a log coming from inside my executed code");
  const ref = useRef();

  useEffect(() => {
    setTimeout(() => {
      const h4 = document.createElement("h4");
      h4.innerHTML = "i am the rendered react component holy crap!!";
      h4.style.color = "hotpink";
      h4.classList.add("animate__animated", "animate__bounceInUp");
      ref.current.appendChild(h4);
    }, 500);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        height: "500px",
        maxHeight: "100%",
        border: "1px solid hotpink",
        overflow: "hidden",
      }}
    />
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
`;

const CodeEntry: React.FC = () => {
  const [input, setInput] = useState(DEFAULT_INPUT);

  const { code, error, bundleCode } = useESBuild();

  useEffect(() => {
    const timer = setTimeout(async () => {
      bundleCode(input);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Resizable direction="y" className="mt-8 rounded-lg">
      <div className="mt-8 flex h-full flex-row rounded-lg bg-slate-600">
        <Resizable className="flex flex-row" direction="x">
          <CodeEditor
            initialValue={input}
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <CodeExecution code={code} bundlerError={error} />
      </div>
    </Resizable>
  );
};

export default CodeEntry;
