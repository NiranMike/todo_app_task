import { combineReducers } from "redux";
import todoReducer from "./reducer";

const rootReducer = combineReducers({
    todoReducer
})

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>