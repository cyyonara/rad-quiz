import UserCredentials from "../types/t.auth.credentials";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  auth: UserCredentials | null;
  setCredentials: (credentials: UserCredentials) => void;
  removeCredentials: () => void;
}

const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      auth: null,
      setCredentials: (credentials) => set({ auth: credentials }),
      removeCredentials: () => set({ auth: null }),
    }),
    { name: "auth" },
  ),
);

export default useAuth;
