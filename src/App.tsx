import React, { useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";

function App() {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const s = useRef<any>();

  const startService = async () => {
    s.current = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
  };

  const onClick = async () => {
    if (!s.current) {
      return null;
    }

    const result = await s.current.transform(input, {
      loader: "jsx",
      target: "es2015",
    });

    setCode(result.code);
  };

  useEffect(() => {
    startService();
  }, []);

  return (
    <div className="min-h-screen">
      <div
        className="m-4 h-full rounded-lg 
                  bg-white p-8 shadow-xl ring-1 ring-slate-900/5 
                  dark:bg-slate-800"
      >
        <h1 className="text-3xl font-bold text-rose-300 underline">what up!</h1>
        <div>
          <textarea
            className="m-8 w-1/3 min-w-fit resize p-4"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div>
            <button className="text-rose-300" onClick={onClick}>
              Submit
            </button>
          </div>
          <pre className="m-8 text-rose-100">{code}</pre>
        </div>
      </div>
    </div>
  );
}

export default App;
