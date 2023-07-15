import { create } from "zustand";

interface PostQuery {
  searchText?: string;
  page?: number;
  perPage?: number;
}

interface PostQueryStore {
  postQuery: PostQuery;
  setSearchText: (searchText: string) => void;
  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
}

const usePostQueryStore = create<PostQueryStore>(set => ({
  postQuery: {},
  setSearchText: (searchText) => set(() => ({ postQuery: {searchText}})),
  setPage: (page) => set((store) => ({ postQuery: { ...store.postQuery, page }})),
  setPerPage: (perPage) => set((store) => ({ postQuery: { ...store.postQuery, perPage }}))
}));

export default usePostQueryStore;
