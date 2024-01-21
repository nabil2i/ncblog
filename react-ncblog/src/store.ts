import { create } from "zustand";

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

interface SearchPostQuery {
  authorId?: string;
  searchText?: string;
  page?: number;
}
interface SearchPostQueryStore {
  searchPostQuery: SearchPostQuery;
  setSearchText: (searchText: string) => void;
  setAuthorId: (authorId: string) => void;
  setPage: (page: number) => void;
}

export const useSearchPostQueryStore = create<SearchPostQueryStore>(set => ({
  searchPostQuery: {},
  setAuthorId: (authorId) => set(() => ({ searchPostQuery: { authorId}})),
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
