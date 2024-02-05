
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";


interface CommentsState {
  page: number;
}

// interface Pagination {
//   page: number;
// }

const initialState = {
  page: 1,
  limit: 10,
}

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    paginate: (state: CommentsState, action) => {
      state.page = action.payload
    },
  }
})

export const { paginate } = commentsSlice.actions

export const selectCurrentPage = (state: RootState) => (state.comments.page)
export const selectLimit = (state: RootState) => (state.comments.limit)

export default commentsSlice.reducer
