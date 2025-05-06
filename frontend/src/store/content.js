import { create } from "zustand";

export const useContentStore = create((set) => ({
  contentType: JSON.parse(localStorage.getItem("contentType")),
  setContentType: (type) => {
    localStorage.setItem("contentType", JSON.stringify(type));
    set({contentType: type})
  },
}));