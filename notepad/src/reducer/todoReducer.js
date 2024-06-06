import { getTodos, getTodoListByContent, addTodo, deleteTodo, updateTodo } from '../api/todo.js'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
export const pushtodos = createAsyncThunk(
    '/todo/fetchStatus',
    async (payload) => {
        const res = await getTodos(payload.page, payload.size)
        return res.data
    }
)
export const searchtodo = createAsyncThunk(
    "/todo1/fetchStatus",
    async (payload) => {
        const res = await getTodoListByContent(payload)
        return res.data
    }
)
const todoSlice = createSlice({
    name: 'todos',
    initialState: { todos: [] },
    reducers: (create) => ({
        addtodo: create.reducer(
            (state, action) => {
                state.todos.unshift(action.payload)
                addTodo(action.payload)
            }),
        updatetodo: create.reducer(
            (state, action) => {
                const todo = action.payload
                state.todos = state.todos.map(item => {
                    return item._id == todo._id ? todo : item
                })
                updateTodo(todo._id, todo)
                //console.log("update!");

            }),
        deletetodo: create.reducer(
            (state, action) => {
                const id = action.payload
                state.todos = state.todos.filter((item) => item._id !== id)
                deleteTodo(id)
            }),

    }),
    extraReducers: (builder) => {
        builder.addCase(searchtodo.fulfilled, (state, action) => {
            //console.log(action, "44");
            state.todos = action.payload
        }).

            addCase(pushtodos.fulfilled, (state, action) => {
                let page = action.meta.arg.page
                if (page == 1) {
                    state.todos = action.payload
                }
                if (page > 1) {
                    action.payload.forEach(todo => {
                        state.todos.push(todo)
                    });
                }

            })
    }
})
export const { addtodo, updatetodo, deletetodo } = todoSlice.actions
export default todoSlice.reducer
