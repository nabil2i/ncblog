import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
// import postsReducer from "./posts/postsSlice";
import commentsReducer from "./comments/commentsSlice";
import usersReducer from "./users/usersSlice";
import postsReducer from "./posts/postsSlice";
import authReducer from "./auth/authSlice";
import notificationReducer from "./notification/notificationSlice";

export default combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  comments: commentsReducer,
  users: usersReducer,
  posts: postsReducer,
  notification: notificationReducer,
})
