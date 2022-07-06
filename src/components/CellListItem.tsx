import CodeEntry from "./CodeEntry";
import TextEditor from "./TextEditor";
import type { Cell } from "../rdx";

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  return (
    <div className="">
      {cell.format === "code" && <CodeEntry />}
      {cell.format === "text" && <TextEditor />}
    </div>
  );
};

export default CellListItem;
