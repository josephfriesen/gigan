import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { cellActions } from "../rdx/";

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(cellActions, dispatch);
};
