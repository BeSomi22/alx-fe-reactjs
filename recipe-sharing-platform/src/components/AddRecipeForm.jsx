import { useState } from "react";

const AddRecipeForm = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({});

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    let newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required.";
    if (!ingredients.trim()) {
      newErrors.ingredients = "Ingredients are required.";
    } else if (ingredients.split(",").length < 2) {
      newErrors.ingredients =
        "Please enter at least two ingredients (comma-separated).";
    }
    if (!steps.trim()) newErrors.steps = "Preparation steps are required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Mock submission (in real app, send to backend or update state)
      const newRecipe = {
        id: Date.now(),
        title,
        summary: steps.slice(0, 60) + "...", // auto summary
        image: "https://via.placeholder.com/150",
        ingredients: ingredients.split(",").map((i) => i.trim()),
        instructions: steps
          .split(".")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      console.log("Recipe submitted:", newRecipe);

      // Reset form
      setTitle("");
      setIngredients("");
      setSteps("");
      alert("Recipe added successfully! (check console)");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <h1 className="text-3xl font-bold text-center mb-6">
        ➕ Add a New Recipe
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 space-y-4"
      >
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Recipe Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter recipe title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Ingredients
          </label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter ingredients, separated by commas"
            rows="3"
          />
          {errors.ingredients && (
            <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
          )}
        </div>

        {/* Steps */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Preparation Steps
          </label>
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter preparation steps (separate sentences with a period)"
            rows="5"
          />
          {errors.steps && (
            <p className="text-red-500 text-sm mt-1">{errors.steps}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
