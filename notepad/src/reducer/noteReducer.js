import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { formateDay } from "../utils/formateDay"
import { getNotes, addNote, updateNote, deleteNote, getNoteListByContent } from '../api/note.js'

export const pushnotes = createAsyncThunk(
    '/note2/fetchStatus',
    async (payload) => {
        const page = payload.page
        const size = payload.size
        const response = await getNotes(page, size)
        return response.data

    },
)
export const searchnote = createAsyncThunk(
    '/note1/fetchStatus',
    async (payload) => {
        const res = await getNoteListByContent(payload)
        return res.data
    }
)
const noteSlice = createSlice({
    name: 'notes',
    initialState: {
        notes: []

    },
    reducers: (create) => ({
        addnotes: create.preparedReducer(
            (content) => {
                if (content == '') {
                    return
                } else {
                    const dates = formateDay(Date.now())
                    return { payload: { content, dates } }
                }
            },
            (state, action) => {
                state.notes.unshift(action.payload)
                addNote(action.payload)
            }
        ),
        editnote: create.reducer(
            (state, action) => {
                const note = action.payload
                state.notes = state.notes.map(item => {
                    return item._id == note._id ? note : item
                })
                updateNote(note._id, note)
            }),
        deletenote: create.reducer(
            (state, action) => {
                const id = action.payload
                state.notes = state.notes.filter((item) => item._id !== id)
                deleteNote(id)

            }),

    }),
    extraReducers: (builder) => {
        builder.addCase(searchnote.fulfilled, (state, action) => {
            state.notes = action.payload
        }).addCase(pushnotes.fulfilled, (state, action) => {
            let page = action.meta.arg.page
            if (page == 1) {
                state.notes = action.payload
            }
            if (page > 1) {
                action.payload.forEach(note => {
                    state.notes.push(note)
                });
            }

        })
    }
})
export const { addnotes, editnote, deletenote } = noteSlice.actions
export default noteSlice.reducer
