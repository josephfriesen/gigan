import { useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "../plugins/unpkgPathPlugin";
import { fetchPlugin } from "../plugins/fetchPlugin";

const useESBuild = () => {
  const [code, setCode] = useState("");
  const s = useRef<any>();

  const startService = async () => {
    s.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };

  const bundleCode = async (input: string) => {
    if (!s.current) {
      return null;
    }

    const result = await s.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
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
