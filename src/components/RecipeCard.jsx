import React from "react";

function RecipeCard({ recipe, onSelect }) {
  if (!recipe) return null; // safety guard

  const isQuick = recipe.strTags?.toLowerCase().includes("quick");

  return (
    <div
      className="recipe-card bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition transform p-5 flex flex-col"
    >
      <div className="relative">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-48 object-cover rounded-xl border border-gray-200"
        />
        {isQuick && (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
            ⏱️ Quick
          </span>
        )}
      </div>

      <h3 className="mt-4 text-lg font-bold text-gray-900 line-clamp-2">
        {recipe.strMeal}
      </h3>

      <div className="mt-2 flex flex-wrap gap-2">
        {recipe.strCategory && (
          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
            {recipe.strCategory}
          </span>
        )}
        {recipe.strArea && (
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            {recipe.strArea}
          </span>
        )}
      </div>

      <button
        onClick={() => onSelect(recipe)}
        className="mt-5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium px-4 py-2 rounded-lg shadow hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-emerald-400"
        aria-label={`View details for ${recipe.strMeal}`}
      >
        View Details
      </button>
    </div>
  );
}

export default RecipeCard;
