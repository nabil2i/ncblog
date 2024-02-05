
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";


interface UsersState {
  page: number;
}

// interface Pagination {
//   page: number;
// }

const initialState = {
  page: 1,
  limit: 10,
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    paginate: (state: UsersState, action) => {
      state.page = action.payload
    },
  }
})

export const { paginate } = usersSlice.actions

export const selectCurrentPage = (state: RootState) => (state.users.page)
export const selectLimit = (state: RootState) => (state.users.limit)

export default usersSlice.reducer
