// src/features/users/usersSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [], // List of users
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload)
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload)
    },
  },
})

// Export the actions
export const { addUser, deleteUser } = usersSlice.actions

// Export the reducer to add to the store
export default usersSlice.reducer
