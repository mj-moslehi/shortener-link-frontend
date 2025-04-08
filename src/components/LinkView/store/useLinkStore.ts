
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Link } from '../../../pages/myLinks/MyLinks.tsx';

interface LinkState {
    selectedLink: Link | null;
    setSelectedLink: (link: Link) => void;
    clearSelectedLink: () => void;
}

export const useLinkStore = create<LinkState>()(
    persist(
        (set) => ({
            selectedLink: null,
            setSelectedLink: (link) => set({ selectedLink: link }),
            clearSelectedLink: () => set({ selectedLink: null }),
        }),
        {
            name: 'selected-link-storage', // localStorage key
        }
    )
);
