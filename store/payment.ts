import { create } from "zustand";

interface initialState {
    hash: string
}

interface Actions {
    setHash: (hash: string) => void;
}

export const usePaymentStore = create<initialState & Actions>((set) => ({
    hash: '',
    setHash: (hash) => set({
        hash: hash
    })
}))
