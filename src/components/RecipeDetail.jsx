import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

function RecipeDetail({ recipe, onBack }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!recipe?.idMeal) return;

    setLoading(true);
    setError(null);

    axios
      .get(`/api/json/v1/1/lookup.php?i=${recipe.idMeal}`)
      .then((response) => {
        if (response.data.meals && response.data.meals.length > 0) {
          setDetails(response.data.meals[0]);
        } else {
          setError("Recipe details not found.");
        }
      })
      .catch(() => setError("Failed to fetch recipe details."))
      .finally(() => setLoading(false));
  }, [recipe.idMeal]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading recipe details…</p>;
  }

  if (error || !details) {
    return (
      <div className="text-center text-red-500">
        {error || "Unable to load this recipe."}
        <div>
          <button
            onClick={onBack}
            className="mt-2 text-emerald-600 underline hover:text-emerald-800"
          >
            Back to Results
          </button>
        </div>
      </div>
    );
  }

  const isQuick =
    details.strTags?.toLowerCase().includes("quick") || false;

  const ingredients = Object.keys(details)
    .filter((key) => key.startsWith("strIngredient") && details[key]?.trim())
    .map((key) => details[key]);

  return (
    <div className="recipe-detail max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-emerald-600 hover:text-emerald-800 mb-6 font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Results
      </button>

      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        {details.strMeal}
      </h2>

      {/* Image */}
      <img
        src={details.strMealThumb}
        alt={details.strMeal}
        className="w-full max-w-2xl h-72 object-cover rounded-xl border mb-6 shadow-sm mx-auto"
      />

      {/* Meta Info */}
      <div className="flex flex-wrap gap-3 mb-6">
        {details.strCategory && (
          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
            {details.strCategory}
          </span>
        )}
        {details.strArea && (
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            {details.strArea}
          </span>
        )}
        {isQuick && (
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
            ⏱️ Quick Recipe
          </span>
        )}
      </div>

      {/* Instructions */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Instructions
        </h3>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {details.strInstructions}
        </p>
      </div>

      {/* Ingredients */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Ingredients
        </h3>
        <div className="flex flex-wrap gap-2">
          {ingredients.map((ingredient, idx) => (
            <span
              key={idx}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm shadow-sm"
            >
              {ingredient}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
