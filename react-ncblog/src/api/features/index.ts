import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
// import postsReducer from "./posts/postsSlice";

export default combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  // posts: postsReducer
})
