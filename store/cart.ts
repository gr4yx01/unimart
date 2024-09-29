import { create } from "zustand";

interface initialState {
    products: any[]
}

interface Actions {
    addProductToCart: (product: any) => void;
    removeProductFromCart: (product: any) => void;
}

export const useCartStore = create<initialState & Actions>((set) => ({
    products: [],
    addProductToCart: (product) => set((state) => {
        const existingProductIndex = state.products.findIndex(p => p.id === product.id);
        console.log('***',product)

        if (existingProductIndex !== -1) {
            const updatedProducts = [...state.products];
            updatedProducts[existingProductIndex].quantity += product?.quantity;
            return { products: updatedProducts };
        } else {
            return { products: [...state.products, product] }
        }
    }),
    removeProductFromCart: (product) => set((state) => ({
        products: state.products.filter(item => item?.id !== product?.id)
    }))
}))
