import { combineReducers } from "@reduxjs/toolkit";
import cellReducer from "./cell";

export const rootReducer = combineReducers({
  cell: cellReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
