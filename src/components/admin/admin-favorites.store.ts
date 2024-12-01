import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritosState {
  favorites: string[];
  toggleFavorites: (data: string) => void;
  isFavorite: (data: string) => boolean;
}

export const useFavoritosStore = create<FavoritosState>()(
  persist(
    (set, get) => ({
      favorites: [],

      isFavorite: (data) => {
        // Verifica si el elemento está en favoritos
        return get().favorites.includes(data);
      },

      toggleFavorites: (data) => {
        const { favorites } = get();
        const isFavorite = favorites.includes(data);

        // Alterna el estado del elemento en favoritos
        set({
          favorites: isFavorite
            ? favorites.filter((item) => item !== data)
            : [...favorites, data],
        });
      },
    }),
    {
      name: "favorites-storage",
    }
  )
);
