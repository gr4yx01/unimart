import { create } from "zustand";

interface initialState {
    products: any[]
}

interface Actions {
    setProducts: (product: any) => void;
}

export const useAvailableProductsStore = create<initialState & Actions>((set) => ({
    products: [],
    setProducts: (products) => set({
        products: products
    })
}))
