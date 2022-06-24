import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../rdx/slices/rootReducer";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
