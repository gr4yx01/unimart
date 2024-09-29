import { create } from "zustand";

interface initialState {
    authorizationUrl: string
}

interface Actions {
    setAuthorizationUrl: (authorizationUrl: string) => void;
}

export const usePaymentStore = create<initialState & Actions>((set) => ({
    authorizationUrl: '',
    setAuthorizationUrl: (authorizationUrl) => set({
        authorizationUrl: authorizationUrl
    })
}))
