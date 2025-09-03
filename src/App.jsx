import React, { useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import RecipeList from "./components/RecipeList.jsx";
import RecipeDetail from "./components/RecipeDetail.jsx";

function App() {
  const [filters, setFilters] = useState({
    ingredient: "",
    exclude: "",
    maxTime: "",
    mood: "",
  });
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    setSelectedRecipe(null); // reset any open recipe
  };

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBackToResults = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="app container mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-3xl font-bold text-center mb-2">Recipe Ideas Finder</h1>
        <p className="text-center text-gray-600">
          Find meals by ingredients, mood, and more — perfect for busy days!
        </p>
      </header>

      <SearchBar onSearch={handleSearch} defaultValues={filters} />

      <main className="mt-6">
        {selectedRecipe ? (
          <RecipeDetail
            recipe={selectedRecipe}
            exclude={filters.exclude}
            onBack={handleBackToResults}
          />
        ) : filters.ingredient ? (
          <RecipeList
            ingredient={filters.ingredient}
            exclude={filters.exclude}
            maxTime={filters.maxTime}
            mood={filters.mood}
            onRecipeSelect={handleRecipeSelect}
          />
        ) : (
          <p className="text-center text-gray-500 mt-8">
            Start by searching for a recipe above.
          </p>
        )}
      </main>
    </div>
  );
}

export default App;
