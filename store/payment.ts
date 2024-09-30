import { create } from "zustand";

interface initialState {
    authorizationUrl: string
    reference: string
    isPolling: boolean
}

interface Actions {
    setAuthorizationUrl: (authorizationUrl: string) => void;
    setReference: (reference: string) => void
    setIsPolling: (isPolling: boolean) => void
}

export const usePaymentStore = create<initialState & Actions>((set) => ({
    authorizationUrl: '',
    reference: '',
    isPolling: false,
    setAuthorizationUrl: (authorizationUrl) => set({
        authorizationUrl: authorizationUrl
    }),
    setReference: (reference) => set({
        reference: reference
    }),
    setIsPolling: (isPolling) => set({
        isPolling: isPolling
    })
}))
