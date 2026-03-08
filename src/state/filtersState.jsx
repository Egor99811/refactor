import { create } from "zustand";
import { FILTERS_TYPES } from "../constants/orderFilters";

export const useFiltersStore = create((set) => ({
  [FILTERS_TYPES.STATUS]: "",
  [FILTERS_TYPES.USER_ID]: "",
  [FILTERS_TYPES.SEARCH]: "",

  setFilter: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value,
    })),
  clearFilters: () =>
    set({
      [FILTERS_TYPES.STATUS]: "",
      [FILTERS_TYPES.USER_ID]: "",
      [FILTERS_TYPES.SEARCH]: "",
    }),
}));
