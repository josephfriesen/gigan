import React, { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";

const TextEditor: React.FC = () => {
  const [editorState, setEditorState] = useState("# Header");
  const [isEditing, setIsEditing] = useState(true);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const endEditMode = (e: MouseEvent) => {
      if (ref.current && e.target && ref.current.contains(e.target as Node)) {
        return null;
      }
      setIsEditing(false);
    };

    document.addEventListener("click", endEditMode, { capture: true });
    return () =>
      document.removeEventListener("click", endEditMode, { capture: true });
  }, []);

  if (isEditing) {
    return (
      <div ref={ref} className="mt-8 ">
        <MDEditor
          value={editorState}
          onChange={(value) => setEditorState(value || "")}
        />
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className="relative mt-8 max-w-full rounded-sm ring-1 ring-white"
    >
      <div className="bg-transparent p-6 first:rounded-t last:rounded-b">
        <MDEditor.Markdown source={editorState} />
      </div>
    </div>
  );
};

export default TextEditor;
