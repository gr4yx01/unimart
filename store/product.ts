import { create } from "zustand";

interface initialState {
    product: {}
}

interface Actions {
    setProduct: (product: any) => void;
}

export const useProductStore = create<initialState & Actions>((set) => ({
    product: {},
    setProduct: (product) => set({
        product: product
    })
}))
