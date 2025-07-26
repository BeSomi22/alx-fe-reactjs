// import { create } from "zustand";

// export const useRecipeStore = create((set, get) => ({
//   recipes: [],
//   searchTerm: '',
//   filteredRecipes: [],

//   //Actions
//   addRecipe: (newRecipe) =>
//     set((state) => ({
//       recipes: [...state.recipes, newRecipe],
//     })),
//   setRecipes: (recipes) => set({ recipes }),
//   deleteRecipe: (id) =>
//     set((state) => ({
//       recipes: state.recipes.filter((recipe) => recipe.id !== id),
//     })),
//   updateRecipe: (updatedRecipe) =>
//     set((state) => ({
//       recipes: state.recipes.map((recipe) =>
//         recipe.id === updatedRecipe.id ? updatedRecipe : recipe
//       ),
//     })),
// }));

import { create } from "zustand";

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: "",
  filteredRecipes: [],
  favorites: [],
  addFavorite: (recipeId) =>
    set((state) => ({ favorites: [...state.favorites, recipeId] })),
  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),
  recommendations: [],
  generateRecommendations: () =>
    set((state) => {
      // Mock implementation based on favorites
      const recommended = state.recipes.filter(
        (recipe) => state.favorites.includes(recipe.id) && Math.random() > 0.5
      );
      return { recommendations: recommended };
    }),

  // Actions
  addRecipe: (newRecipe) =>
    set((state) => {
      const updatedRecipes = [...state.recipes, newRecipe];
      const filtered = get().searchTerm
        ? updatedRecipes.filter((r) =>
            r.title.toLowerCase().includes(get().searchTerm.toLowerCase())
          )
        : updatedRecipes;
      return { recipes: updatedRecipes, filteredRecipes: filtered };
    }),

  deleteRecipe: (id) =>
    set((state) => {
      const updated = state.recipes.filter((r) => r.id !== id);
      const filtered = get().searchTerm
        ? updated.filter((r) =>
            r.title.toLowerCase().includes(get().searchTerm.toLowerCase())
          )
        : updated;
      return { recipes: updated, filteredRecipes: filtered };
    }),

  updateRecipe: (updatedRecipe) =>
    set((state) => {
      const updated = state.recipes.map((r) =>
        r.id === updatedRecipe.id ? updatedRecipe : r
      );
      const filtered = get().searchTerm
        ? updated.filter((r) =>
            r.title.toLowerCase().includes(get().searchTerm.toLowerCase())
          )
        : updated;
      return { recipes: updated, filteredRecipes: filtered };
    }),

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes(); // call filter on term change
  },

  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    })),
}));
