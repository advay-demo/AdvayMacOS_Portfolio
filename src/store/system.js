import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useSystemStore = create(
    immer((set) => ({
        isBooted: false,
        isLoggedIn: false,
        wallpaper: "wallpaper.png",
        spotlightOpen: false,
        contextMenu: { isOpen: false, x: 0, y: 0 },
        isMissionControl: false,

        setBooted: (val) =>
            set((state) => {
                state.isBooted = val;
            }),

        setLoggedIn: (val) =>
            set((state) => {
                state.isLoggedIn = val;
            }),

        setWallpaper: (val) =>
            set((state) => {
                state.wallpaper = val;
            }),

        toggleSpotlight: () =>
            set((state) => {
                state.spotlightOpen = !state.spotlightOpen;
            }),

        setSpotlight: (val) =>
            set((state) => {
                state.spotlightOpen = val;
            }),

        toggleMissionControl: () =>
            set((state) => {
                state.isMissionControl = !state.isMissionControl;
            }),

        openContextMenu: (x, y) =>
            set((state) => {
                state.contextMenu = { isOpen: true, x, y };
            }),

        closeContextMenu: () =>
            set((state) => {
                state.contextMenu.isOpen = false;
            }),
    }))
);

export default useSystemStore;
