import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import ErrorMessage from "../utilities/ErrorMessage";

function RecipeList({ ingredient, maxTime, mood, onRecipeSelect }) {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ingredient) {
      setRecipes([]);
      setFilteredRecipes([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    axios
      .get(`/api/json/v1/1/filter.php?i=${ingredient}`)
      .then((res) => {
        if (res.data.meals) {
          setRecipes(res.data.meals);
        } else {
          setRecipes([]);
          setError("No recipes found.");
        }
      })
      .catch(() => setError("Failed to fetch recipes."))
      .finally(() => setLoading(false));
  }, [ingredient]);

  const fetchMealDetails = async (list) => {
    const detailPromises = list.map((r) =>
      axios
        .get(`/api/json/v1/1/lookup.php?i=${r.idMeal}`)
        .then((res) => res.data.meals[0])
        .catch(() => null)
    );
    const details = await Promise.all(detailPromises);
    return details.filter(Boolean);
  };

  useEffect(() => {
    let isMounted = true;

    const applyFilters = async () => {
      if (recipes.length === 0) {
        setFilteredRecipes([]);
        return;
      }

      let current = recipes;

      if (!mood && !maxTime) {
        if (isMounted) setFilteredRecipes(current);
        return;
      }

      setLoading(true);

      const details = await fetchMealDetails(current);

      let filtered = details;

      if (mood) {
        filtered = filtered.filter(
          (d) =>
            d.strCategory?.toLowerCase() === mood.toLowerCase() ||
            d.strArea?.toLowerCase() === mood.toLowerCase() ||
            d.strMeal?.toLowerCase().includes(mood.toLowerCase())
        );
      }

      if (maxTime && Number(maxTime) <= 30) {
        filtered = filtered.filter((d) =>
          d.strTags?.toLowerCase().includes("quick")
        );
      }

      if (isMounted) setFilteredRecipes(filtered);
      setLoading(false);
    };

    applyFilters();
    return () => {
      isMounted = false;
    };
  }, [recipes, mood, maxTime]);

  if (loading)
    return (
      <div className="flex justify-center items-center py-12">
        <span className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500"></span>
        <p className="ml-3 text-emerald-600 font-medium">Fetching delicious recipes…</p>
      </div>
    );

  if (error)
    return (
      <div className="text-center bg-red-100 text-red-700 py-4 rounded-lg shadow-md">
        ⚠️ {error}
      </div>
    );

  if (!ingredient)
    return (
      <div className="text-center text-gray-400 py-10 italic">
        🍳 Enter ingredients above to see recipe ideas.
      </div>
    );

  if (filteredRecipes.length === 0)
    return (
      <div className="text-center text-gray-500 py-10">
        ❌ No recipes match your filters.
      </div>
    );

  return (
    <div className="recipe-list grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
      {filteredRecipes.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal}
          recipe={recipe}
          onSelect={onRecipeSelect}
        />
      ))}
    </div>
  );
}

export default RecipeList;