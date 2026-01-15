import { create } from 'zustand';

interface NavState {
    isSidebarOpen: boolean;
    isNavbarOpen: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
    toggleSidebar: () => void;
    openNavbar: () => void;
    closeNavbar: () => void;
    toggleNavbar: () => void;
}

export const useNavStore = create<NavState>((set) => ({
    isSidebarOpen: false,
    isNavbarOpen: false,
    openSidebar: () => set({ isSidebarOpen: true, isNavbarOpen: false }),
    closeSidebar: () => set({ isSidebarOpen: false }),
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen, isNavbarOpen: false })),
    openNavbar: () => set({ isNavbarOpen: true, isSidebarOpen: false }),
    closeNavbar: () => set({ isNavbarOpen: false }),
    toggleNavbar: () => set((state) => ({ isNavbarOpen: !state.isNavbarOpen, isSidebarOpen: false })),
}));
