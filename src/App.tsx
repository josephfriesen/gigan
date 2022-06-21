import React, { useState } from "react";
import useESBuild from "./hooks/useESBuild";

function App() {
  const [input, setInput] = useState("");

  const { code, bundleCode } = useESBuild(input);

  const onClick = () => {
    bundleCode();
  };

  return (
    <div className="min-h-screen">
      <div
        className="
                    m-4 h-full rounded-lg 
                    bg-slate-700 p-8 shadow-xl ring-1 
                    ring-slate-900/5
                  "
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
