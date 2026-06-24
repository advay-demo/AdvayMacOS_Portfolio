import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "@constants/index.js";

const useWindowStore = create(
    immer((set) => ({
        windows: WINDOW_CONFIG,
        nextZIndex: INITIAL_Z_INDEX + 1,

        openWindow: (windowKey, data = null) =>
            set((state) => {
                const win = state.windows[windowKey];
                if (!win) return;
                win.isOpen = true;
                win.zIndex = state.nextZIndex++;
                win.data = data ?? win.data;
            }),

        closeWindow: (windowKey) =>
            set((state) => {
                const win = state.windows[windowKey];
                if (!win) return;
                win.isOpen = false;
                win.zIndex = INITIAL_Z_INDEX;
                win.data = null;
            }),

        focusWindow: (windowKey) =>
            set((state) => {
                const win = state.windows[windowKey];
                if (!win) return;
                win.zIndex = state.nextZIndex++;
            }),

        toggleMaximize: (windowKey) =>
            set((state) => {
                const win = state.windows[windowKey];
                if (!win) return;
                win.isMaximized = !win.isMaximized;
                win.zIndex = state.nextZIndex++;
            }),

        toggleMinimize: (windowKey) =>
            set((state) => {
                const win = state.windows[windowKey];
                if (!win) return;
                win.isMinimized = !win.isMinimized;
            }),
    }))
);

export default useWindowStore;
