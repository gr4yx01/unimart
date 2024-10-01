import { create } from "zustand";

interface initialState {
    order: {}
}

interface Actions {
    setOrder: (order: any) => void;
}

export const useOrderState = create<initialState & Actions>((set) => ({
    order: {},
    setOrder: (order) => set(() => {
       return { order: order }
    })
}))
