import { AppDispatch } from "@/store";
import actionsCreators from "@/store/actions-creators";
import { RootState } from "@/store/reducers";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { bindActionCreators } from "redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAction = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actionsCreators, dispatch)
}
