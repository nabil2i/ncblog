
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";


interface PostsState {
  page: number;
}

// interface Pagination {
//   page: number;
// }

const initialState = {
  page: 1,
  limit: 10,
}

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    paginate: (state: PostsState, action) => {
      state.page = action.payload
    },
  }
})

export const { paginate } = postsSlice.actions

export const selectCurrentPage = (state: RootState) => (state.posts.page)
export const selectLimit = (state: RootState) => (state.posts.limit)

export default postsSlice.reducer
