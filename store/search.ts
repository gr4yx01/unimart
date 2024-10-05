import { create } from "zustand";

interface initialState {
    searchTerm: string
}

interface Actions {
    setSearchTerm: (searchTerm: string) => void
}

export const useCartStore = create<initialState & Actions>((set) => ({
    searchTerm: '',
    setSearchTerm: (searchTerm) => set((state) => {
        return { searchTerm: searchTerm }
    })
}))
