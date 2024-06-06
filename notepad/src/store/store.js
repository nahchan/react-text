import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "../reducer/noteReducer";
import todoReducer from "../reducer/todoReducer";
export const store = configureStore({
    reducer: {
        notes: noteReducer,
        todos: todoReducer
    }
})