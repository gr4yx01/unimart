import { create } from "zustand";

interface initialState {
    userId: string
}

interface Actions {
    setUserId: (userId: string) => void;
}

export const useUserStore = create<initialState & Actions>((set) => ({
    userId: '',
    setUserId: (userId) => set(() => {
       return { userId: userId }
    })
}))
    