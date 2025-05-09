import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Simulated API call using setTimeout
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Eman" },
        { id: 2, name: "Ahmed" },
      ]);
    }, 1000); // simulate 1 second delay
  });
});

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    editUser: (state, action) => {
        const { id, name } = action.payload;
        const existingUser = state.users.find((user) => user.id === id);
        if (existingUser) {
          existingUser.name = name;
        }
      }
      


  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to fetch users";
      });
  },
});

export const { addUser, deleteUser, editUser } = usersSlice.actions;
export default usersSlice.reducer;
