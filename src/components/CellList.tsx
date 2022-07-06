import { useEffect } from "react";
import CellListItem from "./CellListItem";
import { cellSelectors } from "../rdx";
import type { Cell } from "../rdx";
import { useAppSelector } from "../hooks/useAppSelector";
import { useActions } from "../hooks/useActions";

const CellList: React.FC = () => {
  const { addNewCell } = useActions();
  useEffect(() => {
    addNewCell({
      id: "asdf",
      format: "code",
      content: "peepeepoopoo",
    });
  }, []);

  const cells: Cell[] = useAppSelector(cellSelectors.selectAll);
  console.log(cells);
  return (
    <div className="flex flex-col">
      {cells &&
        cells.map((c) => {
          return <CellListItem key={c.id} cell={c} />;
        })}
    </div>
  );
};

export default CellList;
