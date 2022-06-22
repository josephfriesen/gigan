import { useRef } from "react";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = (props: CodeEditorProps) => {
  const { initialValue, onChange } = props;
  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, editor) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    editor.getModel()?.updateOptions({ tabSize: 2 });
  };

  const handleFormatClick = () => {
    const raw = editorRef.current.getModel().getValue();
    const formatted = prettier.format(raw, {
      parser: "babel",
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: false,
    });
    editorRef.current.setValue(formatted);
  };

  return (
    <div
      className="group relative h-full"
      style={{ width: "calc(100% - 12px)" }}
    >
      <button
        className="invisible absolute bottom-4 right-4 z-10 rounded-md 
        bg-rose-400 px-4 py-2 text-xs font-bold text-white
        opacity-60 transition-all delay-300 group-hover:visible
        "
        onClick={handleFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        language="javascript"
        theme="dark"
        height="100%"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
