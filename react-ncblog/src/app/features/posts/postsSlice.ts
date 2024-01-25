import { EntityId, PayloadAction, createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import Post, { PostData } from "../../../entities/Post";
import { baseUrl } from "../../api/apiSlice";
import { RootState } from "../../store";

interface PostsState {
  ids: EntityId[];
  entities: Record<EntityId, Post>;
  pagination: PaginationInfo;
  isLoading: boolean,
  error: boolean,
}

interface PaginationInfo {
  count: number; 
  current: number;
  prev: number | null; 
  next: number | null;
  perPage: number;
}

interface ServerResponse<R> {
  success: boolean;
  data: R
  message?: string;
  error?: {
    code: number,
    message: string,
  }
}

interface DataDelete {
  id: string;
}

interface DataPost {
    count: number;
    current: number;
    prev: number | null;
    next: number | null;
    perPage: number;
    results: Post[];
}

interface DataUpdate {
    id: string;
    changes: PostData
}


const postsAdapter = createEntityAdapter<Post>({
  // selectId: (post: Post) => post.id,
  // sortComparer: (a: Post, b: Post) => b.createdAt.localeCompare(a.createdAt)
});

const initialState = postsAdapter.getInitialState({
  isLoading: false,
  error: false,
  pagination: {
    count: 0,
    current: 1,
    prev: null,
    next: null,
    perPage: 10,
  },
})

const postsSlice = createSlice({
  name: 'paginatedPosts',
  initialState,
  reducers: {
    setPagination: (state: PostsState, action: PayloadAction<ServerResponse<DataPost>>) => {
      const { data } = action.payload;
      state.pagination = {
        count: data.count,
        current: data.current,
        prev: data.prev,
        next: data.next,
        perPage: data.perPage,
      };
    },
    unsetPagination: (state: PostsState) => {
      state.pagination = {
        count: 0,
        current: 1,
        prev: null,
        next: null,
        perPage: 10,
      };
    },
    setPosts: (state, action: PayloadAction<ServerResponse<DataPost>>) => {
      const { data } = action.payload;
      const postsWithIds = data.results.map(post => {
        return { ...post, id: post._id };
      });
      postsAdapter.upsertMany(state, postsWithIds)
    },
    removePost: (state, action: PayloadAction<ServerResponse<DataDelete>>) => {
      const { data } = action.payload;
      const postId = data.id
      postsAdapter.removeOne(state, postId)
    },
    patchPost: (state, action: PayloadAction<DataUpdate>) => {
      const { id, changes } = action.payload;
      postsAdapter.updateOne(state, {id, changes})
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
    unsetLoading: (state) => {
      state.isLoading = false;
    },
    setError: (state) => {
      state.error = true;
    },
    unsetError: (state) => {
      state.error = false;
    },
    // loadPostsFailed: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        postsSlice.caseReducers.setLoading(state)
      })
      .addCase(getPosts.fulfilled, (state, action: PayloadAction<ServerResponse<DataPost>>) => {
        postsSlice.caseReducers.unsetLoading(state)
        postsSlice.caseReducers.unsetError(state)
        postsSlice.caseReducers.setPosts(state, action)
        postsSlice.caseReducers.setPagination(state, action)
      })
      .addCase(getPosts.rejected, (state) => {
        postsSlice.caseReducers.setError(state)
        postsSlice.caseReducers.unsetLoading(state)
      })
      .addCase(deletePost.pending, (state) => {
        postsSlice.caseReducers.setLoading(state)
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<ServerResponse<DataDelete>>) => {
        postsSlice.caseReducers.unsetLoading(state)
        postsSlice.caseReducers.removePost(state, action)
      })
      .addCase(deletePost.rejected, (state) => {
        postsSlice.caseReducers.setError(state)
        postsSlice.caseReducers.unsetLoading(state)
      })
      .addCase(updatePost.pending, (state) => {
        postsSlice.caseReducers.setLoading(state)
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<DataUpdate>) => {
        postsSlice.caseReducers.patchPost(state, action);
        postsSlice.caseReducers.unsetLoading(state);
        postsSlice.caseReducers.unsetError(state);
      })
      .addCase(updatePost.rejected, (state) => {
        postsSlice.caseReducers.setError(state)
        postsSlice.caseReducers.unsetLoading(state)
      })
  }
})


export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (_, { rejectWithValue }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }

    try {
      const res = await axios.get<ServerResponse<DataPost>>(baseUrl + "/posts", config);
      return res.data
    } catch (error) {
      // console.log(error)
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
)

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId, { rejectWithValue }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }

    try {
      const res = await axios.delete(baseUrl + "/posts/" + postId, config);
      return res.data
    } catch (error) {
      // console.log(error)
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
)

export const updatePost = createAsyncThunk<DataUpdate, DataUpdate>(
  'posts/updatePost',
  async ( {id, changes}, { rejectWithValue }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }

    try {
      await axios.put(baseUrl + "/posts/" + id, changes, config);
      return { id, changes }
    } catch (error) {
      // console.log(error)
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
)

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
} = postsAdapter.getSelectors((state: RootState) => state.posts)

export const getPostsStatus = (state: RootState) => state.posts.isLoading
export const getPostsError = (state: RootState) => state.posts.error

// export const selectAllPosts = (state: RootState) => state.posts.entities
// export const selectPostById = (state: RootState) => state.posts

// Memoization
// export const selectPostsByUser = createSelector(
//   [selectAllPosts, (state, userId) => userId],
//   (posts, userId) => posts.filter(post => post.user === userId)
// )

export const { setLoading, setError } = postsSlice.actions

export default postsSlice.reducer
