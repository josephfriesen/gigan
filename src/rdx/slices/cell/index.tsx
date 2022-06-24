import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../../store";

// types
export type CellFormat = "code" | "text";
export type CellMoveDirection = "up" | "down";

export interface Cell {
  id: string;
  format: CellFormat;
  content: string;
}

export const cellAdapter = createEntityAdapter<Cell>();

const initialState = cellAdapter.getInitialState({
  loading: false,
  error: null,
});

export const cellSlice = createSlice({
  name: "cell",
  initialState,
  reducers: {
    addNewCell: cellAdapter.addOne, // don't use this, screws up the ordering and id not guaranteed to be unique!
    updateCell: cellAdapter.updateOne,
    deleteCell: cellAdapter.removeOne,
    moveCell(
      state,
      action: PayloadAction<{ id: string; direction: CellMoveDirection }>
    ) {
      const nextIds = [...state.ids];
      const { id, direction } = action.payload;
      const MOVES: any = {
        up: 1,
        down: -1,
      };
      const current = nextIds.indexOf(id);
      nextIds.splice(current, 1);
      nextIds.splice(current + MOVES[direction], 0, id);
      return {
        ...state,
        ids: nextIds,
      };
    },
    insertCellBefore(state, action) {
      return state;
    },
  },
});

// actions
export const actions = cellSlice.actions;
export { useAppDispatch } from "../../../hooks/useAppDispatch";

// selectors
export const selectIsLoading = (state: RootState) => state.cell.loading;
export const selectCellError = (state: RootState) => state.cell.error;
export const selectors = {
  selectIsLoading,
  selectCellError,
  ...cellAdapter.getSelectors(),
};

// reducer
export default cellSlice.reducer;
