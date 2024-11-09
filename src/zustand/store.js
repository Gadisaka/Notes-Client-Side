import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      authToken: null,
      notes: [],
      user: null,
      setUser: (user) => set({ user }),
      login: (token) => set({ authToken: token }),
      logout: () => set({ authToken: null }),
      setNotes: (notes) => set({ notes }),
      addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
      deleteNote: (noteId) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== noteId),
        })),
      updateNote: (noteId) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === noteId
              ? { ...note, is_completed: !note.is_completed }
              : note
          ),
        })),
      clearCompletedNotes: () =>
        set((state) => ({
          notes: state.notes.filter((note) => !note.is_completed),
        })),
    }),
    {
      name: "auth-storage", // name of the item in storage
      getStorage: () => (typeof window !== "undefined" ? localStorage : null), // check for window object
    }
  )
);

const useToggleStore = create((set) => ({
  toggleButton: false, // Add toggle button state
  toggle: () => set((state) => ({ toggleButton: !state.toggleButton })),
}));

export { useAuthStore, useToggleStore };
