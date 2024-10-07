import { create } from "zustand";


// post query
interface PostQuery {
  searchText?: string;
  page?: number;
  limit?: number;
  order?: string;
}

interface PostQueryStore {
  postQuery: PostQuery;
  setSearchText: (searchText: string) => void;
  setPage: (page: number) => void;
  setOrder: (order: string) => void;
  setLimit: (limit: number) => void;
  // setLatestPosts: (latestPosts: number) => void;
}

const usePostQueryStore = create<PostQueryStore>(set => ({
  postQuery: {},
  setSearchText: (searchText) => set(() => ({ postQuery: {searchText}})),
  setPage: (page) => set((store) => ({ postQuery: { ...store.postQuery, page }})),
  setLimit: (limit) => set((store) => ({ postQuery: { ...store.postQuery, limit }})),
  setOrder: (order) => set((store) => ({ postQuery: { ...store.postQuery, order }})),
  // setLatestPosts: (latestPosts) => set((store) => ({ postQuery: {latestPosts}}))
}));

export default usePostQueryStore;

// comments
interface PostCommentQuery {
  startIndex?: number;
  limit?: number;
  order?: string;
}

interface PostCommentQueryStore {
  postCommentQuery: PostCommentQuery;
  setStartIndex: (index: number) => void;
  setOrder: (order: string) => void;
  setLimit: (limit: number) => void;
}

export const usePostCommentQueryStore = create<PostCommentQueryStore>(set => ({
  postCommentQuery: {},
  setStartIndex: (startIndex) => set((store) => {
    return {
      postCommentQuery: { ...store.postCommentQuery, startIndex}
    }
  }),
  setOrder: (order) => set((store) => {
    return {
      postCommentQuery: { ...store.postCommentQuery, order}
    }
  }),
  setLimit: (limit) => set((store) => {
    return {
      postCommentQuery: { ...store.postCommentQuery, limit}
    }
  })
}));

// replies
interface CommentRepliesQuery {
  startIndex?: number;
  limit?: number;
  topParentCommentId?: string;
  order?: string;
}

interface CommentRepliesQueryStore {
  commentRepliesQuery: CommentRepliesQuery;
  setStartIndex: (index: number) => void;
  setOrder: (order: string) => void;
  setLimit: (limit: number) => void;
  setTopParentCommentId: (topParentCommentId: string) => void;
}

export const useCommentRepliesQueryStore = create<CommentRepliesQueryStore>(set => ({
  commentRepliesQuery: {},
  setStartIndex: (startIndex) => set((store) => {
    return {
      commentRepliesQuery: { ...store.commentRepliesQuery, startIndex}
    }
  }),
  setTopParentCommentId: (topParentCommentId) => set((store) => ({
    commentRepliesQuery: { ...store.commentRepliesQuery, topParentCommentId}
  })),
  setOrder: (order) => set((store) => {
    return {
      commentRepliesQuery: { ...store.commentRepliesQuery, order}
    }
  }),
  setLimit: (limit) => set((store) => {
    return {
      commentRepliesQuery: { ...store.commentRepliesQuery, limit}
    }
  })
  
}));

// search query
interface SearchPostQuery {
  postAuthorId?: string;
  searchText?: string;
  page?: number;
  category?: string;
  order?: string;
  limit?: number;
}
interface SearchPostQueryStore {
  searchPostQuery: SearchPostQuery;
  setSearchText: (searchText: string) => void;
  setPostAuthorId: (postAuthorId: string) => void;
  setCategory: (category: string) => void;
  setPage: (page: number) => void;
  setOrder: (order: string) => void;
  setLimit: (limit: number) => void;
}

export const useSearchPostQueryStore = create<SearchPostQueryStore>(set => ({
  searchPostQuery: {},
  setPostAuthorId: (postAuthorId) => set(() => ({ searchPostQuery: { postAuthorId}})),
  setCategory: (category) => set(() => ({ searchPostQuery: { category}})),
  setSearchText: (searchText) => set(() => ({ searchPostQuery: { searchText}})),
  setPage: (page) => set((store) => ({ searchPostQuery: { ...store.searchPostQuery, page }})),
  setLimit: (limit) => set((store) => ({ searchPostQuery: { ...store.searchPostQuery, limit }})),
  setOrder: (order) => set((store) => ({ searchPostQuery: { ...store.searchPostQuery, order }})),
}))


interface BookQuery {
  searchText?: string;
  page?: number;
  order?: string;
  limit?: number;
}

interface BookQueryStore {
  bookQuery: BookQuery;
  setSearchText: (searchText: string) => void;
  setPage: (page: number) => void;
  setOrder: (order: string) => void;
  setLimit: (limit: number) => void;
}

export const useBookQueryStore = create<BookQueryStore>(set => ({
  bookQuery: {},
  setSearchText: (searchText) => set(() => ({ bookQuery: {searchText}})),
  setPage: (page) => set((store) => ({ bookQuery: { ...store.bookQuery, page }})),
  setLimit: (limit) => set((store) => ({ bookQuery: { ...store.bookQuery, limit }})),
  setOrder: (order) => set((store) => ({ bookQuery: { ...store.bookQuery, order }})),
}));

//user posts query
interface UserPostQuery {
  page?: number;
  limit?: number;
  order?: string;
}

interface UserPostQueryStore {
  userPostQuery: UserPostQuery;
  setPage: (page: number) => void;
  setOrder: (order: string) => void;
  setLimit: (limit: number) => void;
}

export const useUserPostQueryStore = create<UserPostQueryStore>(set => ({
  userPostQuery: {},
  setPage: (page) => set((store) => ({ userPostQuery: { ...store.userPostQuery, page }})),
  setLimit: (limit) => set((store) => ({ userPostQuery: { ...store.userPostQuery, limit }})),
  setOrder: (order) => set((store) => ({ userPostQuery: { ...store.userPostQuery, order }})),
}));


