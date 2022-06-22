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
      h4.classList.add("animate__animated");
      h4.classList.add("animate__bounceInUp");
      ref.current.appendChild(h4);
    }, 500);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        height: "500px",
        overflow: "hidden",
      }}
    ></div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
`;

const CodeEntry = () => {
  const [input, setInput] = useState(DEFAULT_INPUT);

  const { code, bundleCode } = useESBuild();

  useEffect(() => {
    const timer = setTimeout(async () => {
      bundleCode(input);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input, bundleCode]);

  return (
    <Resizable direction="y" className="mt-8 rounded-lg">
      <div className="mt-8 flex h-full flex-row rounded-lg bg-slate-600">
        <Resizable className="flex flex-row" direction="x">
          <CodeEditor
            initialValue={input}
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <CodeExecution code={code} />
      </div>
    </Resizable>
  );
};

export default CodeEntry;
