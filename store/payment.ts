import { create } from "zustand";

interface initialState {
    authorizationUrl: string
    reference: string
}

interface Actions {
    setAuthorizationUrl: (authorizationUrl: string) => void;
    setReference: (reference: string) => void
}

export const usePaymentStore = create<initialState & Actions>((set) => ({
    authorizationUrl: '',
    reference: '',
    setAuthorizationUrl: (authorizationUrl) => set({
        authorizationUrl: authorizationUrl
    }),
    setReference: (reference) => set({
        reference: reference
    }),
}))
