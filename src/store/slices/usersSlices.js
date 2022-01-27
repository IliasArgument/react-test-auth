import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: [],
    loadin: false
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers(state, action) {
            state.users = action.payload.users;
            state.loading = action.payload.loading;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUser, removeUser } = usersSlice.actions

export default usersSlice.reducer;