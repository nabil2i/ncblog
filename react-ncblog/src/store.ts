import { create } from "zustand";


// post query
interface PostQuery {
  searchText?: string;
  page?: number;
  // perPage?: number;
  // latestPosts?:number;
}

interface PostQueryStore {
  postQuery: PostQuery;
  setSearchText: (searchText: string) => void;
  setPage: (page: number) => void;
  // setPerPage: (perPage: number) => void;
  // setLatestPosts: (latestPosts: number) => void;
}

const usePostQueryStore = create<PostQueryStore>(set => ({
  postQuery: {},
  setSearchText: (searchText) => set(() => ({ postQuery: {searchText}})),
  setPage: (page) => set((store) => ({ postQuery: { ...store.postQuery, page }})),
  // setPerPage: (perPage) => set((store) => ({ postQuery: { ...store.postQuery, perPage }})),
  // setLatestPosts: (latestPosts) => set((store) => ({ postQuery: {latestPosts}}))
}));

export default usePostQueryStore;

// search query
interface SearchPostQuery {
  authorId?: string;
  searchText?: string;
  page?: number;
  category?: string;
}
interface SearchPostQueryStore {
  searchPostQuery: SearchPostQuery;
  setSearchText: (searchText: string) => void;
  setAuthorId: (authorId: string) => void;
  setCategory: (category: string) => void;
  setPage: (page: number) => void;
}

export const useSearchPostQueryStore = create<SearchPostQueryStore>(set => ({
  searchPostQuery: {},
  setAuthorId: (authorId) => set(() => ({ searchPostQuery: { authorId}})),
  setCategory: (category) => set(() => ({ searchPostQuery: { category}})),
  setSearchText: (searchText) => set(() => ({ searchPostQuery: { searchText}})),
  setPage: (page) => set((store) => ({ searchPostQuery: { ...store.searchPostQuery, page }})),
}))


interface BookQuery {
  searchText?: string;
  page?: number;
}

interface BookQueryStore {
  bookQuery: BookQuery;
  setSearchText: (searchText: string) => void;
  setPage: (page: number) => void;
}

export const useBookQueryStore = create<BookQueryStore>(set => ({
  bookQuery: {},
  setSearchText: (searchText) => set(() => ({ bookQuery: {searchText}})),
  setPage: (page) => set((store) => ({ bookQuery: { ...store.bookQuery, page }})),
}));

//user posts query
interface UserPostQuery {
  page?: number;
  // perPage?: number;
}

interface UserPostQueryStore {
  userPostQuery: UserPostQuery;
  setPage: (page: number) => void;
  // setPerPage: (perPage: number) => void;
}

export const useUserPostQueryStore = create<UserPostQueryStore>(set => ({
  userPostQuery: {},
  setPage: (page) => set((store) => ({ userPostQuery: { ...store.userPostQuery, page }})),
  // setPerPage: (perPage) => set((store) => ({ userPostQuery: { ...store.userPostQuery, perPage }})),
}));
