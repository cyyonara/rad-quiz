import { create } from "zustand";

interface AvatarDropdownState {
  showDropdown: boolean;
  toggleAvatarDropdown: () => void;
  closeDropdown: () => void;
}

const useAvatarDropdown = create<AvatarDropdownState>()((set) => ({
  showDropdown: false,
  toggleAvatarDropdown: () =>
    set((state) => ({ showDropdown: !state.showDropdown })),
  closeDropdown: () => {
    set({ showDropdown: false });
  },
}));

export default useAvatarDropdown;
