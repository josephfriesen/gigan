import { useState, useEffect } from "react";
import useESBuild from "../hooks/useESBuild";
import CodeEditor from "./CodeEditor";
import CodeExecution from "./CodeExecution";
import Resizable from "./Resizable";

const DEFAULT_INPUT = "";

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
