import { useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "../plugins/unpkgPathPlugin";

const useESBuild = (input: String) => {
  const [code, setCode] = useState("");
  const s = useRef<any>();

  const startService = async () => {
    s.current = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
  };

  const bundleCode = async () => {
    if (!s.current) {
      return null;
    }

    const result = await s.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin()],
      define: {
        "process.env.NODE_ENV": "'production'",
        global: "window",
      },
    });

    setCode(result.outputFiles[0].text);
  };

  useEffect(() => {
    startService();
  }, []);

  return { code, bundleCode };
};

export default useESBuild;
