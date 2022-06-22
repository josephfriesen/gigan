import { useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "../plugins/unpkgPathPlugin";
import { fetchPlugin } from "../plugins/fetchPlugin";

const useESBuild = () => {
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<any>(null);
  const s = useRef<any>();

  const startService = async () => {
    s.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };

  const bundler = async (input: string) => {
    if (!s.current) {
      return null;
    }

    if (input === "") {
      setCode("");
      return null;
    }

    try {
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

      const output = result.outputFiles[0].text;

      setCode(output);
      setError(null);
    } catch (err) {
      setCode("");
      let msg = "";
      if (err instanceof Error) msg = err.message;
      else msg = String(err);
      setError(msg);
    }
  };

  useEffect(() => {
    startService();
  }, []);

  return { code, error, bundleCode: bundler };
};

export default useESBuild;
