import CodeEntry from "./components/CodeEntry";

function App() {
  return (
    <div
      className="
      app-container 
      m-0 flex h-screen w-screen 
      flex-col overflow-auto border-2 
      border-slate-800 bg-slate-800 p-8
    "
    >
      <div className="flex w-full flex-col justify-center rounded-sm border-2 bg-slate-600 p-8 align-middle">
        <h1 className="text-3xl font-bold text-rose-300">Gigan</h1>
        <h4 className="text-xl text-rose-300">
          Write, transpile, bundle and execute jsx? Holy crap!
        </h4>
      </div>
      <CodeEntry />
    </div>
  );
}

export default App;
