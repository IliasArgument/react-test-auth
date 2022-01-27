import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: null,
    id: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthUser(state, action) {
            state.email = action.payload.email;
                state.id = action.payload.id
        },
        removeUser(state) {
            state.email = null;
                state.id = null;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setAuthUser, removeUser } = authSlice.actions

export default authSlice.reducer;