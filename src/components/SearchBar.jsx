import React, { useState } from "react";
import { Search, SlidersHorizontal, Clock, Globe } from "lucide-react";

function SearchBar({ onSearch, defaultValues }) {
  const [form, setForm] = useState({
    ingredient: defaultValues?.ingredient || "",
    maxTime: defaultValues?.maxTime || "",
    mood: defaultValues?.mood || "",
  });

  const [showFilters, setShowFilters] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.ingredient.trim()) return;
    onSearch(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 shadow-md rounded-2xl p-8 w-full max-w-4xl mx-auto mb-10"
    >
      {/* Top row */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Ingredient Field */}
        <div className="flex flex-col flex-1 w-full">
          <label
            htmlFor="ingredient"
            className="text-sm font-medium mb-1 text-gray-700 flex items-center gap-2"
          >
            <Search className="w-4 h-4 text-emerald-600" />
            Main Ingredients <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="ingredient"
            id="ingredient"
            placeholder="e.g., chicken, garlic"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={form.ingredient}
            onChange={handleChange}
          />
          <p className="text-xs text-gray-500 mt-1">
            Separate multiple ingredients with commas
          </p>
        </div>

        {/* Toggle Filters */}
        <button
          type="button"
          onClick={() => setShowFilters((prev) => !prev)}
          className="md:w-auto w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-3 rounded-lg shadow-sm transition flex items-center justify-center gap-2"
        >
          <SlidersHorizontal className="w-4 h-4" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

        {/* Search Button */}
        <button
          type="submit"
          disabled={!form.ingredient.trim()}
          className="md:w-auto w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4" />
          Search
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Max Time */}
          <div className="flex flex-col">
            <label
              htmlFor="maxTime"
              className="text-sm font-medium mb-1 text-gray-700 flex items-center gap-2"
            >
              <Clock className="w-4 h-4 text-gray-500" />
              Max Cooking Time (minutes)
            </label>
            <input
              type="number"
              name="maxTime"
              id="maxTime"
              min="0"
              placeholder="e.g., 30"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={form.maxTime}
              onChange={handleChange}
            />
          </div>

          {/* Cuisine */}
          <div className="flex flex-col">
            <label
              htmlFor="mood"
              className="text-sm font-medium mb-1 text-gray-700 flex items-center gap-2"
            >
              <Globe className="w-4 h-4 text-gray-500" />
              Mood / Cuisine
            </label>
            <select
              name="mood"
              id="mood"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={form.mood}
              onChange={handleChange}
            >
              <option value="">Any</option>
              <option value="Italian">Italian</option>
              <option value="Mexican">Mexican</option>
              <option value="Indian">Indian</option>
              
            </select>
          </div>
        </div>
      )}
    </form>
  );
}

export default SearchBar;
