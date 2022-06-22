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
    <div className="group h-96 p-4">
      <div className="flex w-full justify-end">
        <button
          className="invisible text-sm text-rose-300 group-hover:visible"
          onClick={handleFormatClick}
        >
          Format
        </button>
      </div>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        language="javascript"
        theme="dark"
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
