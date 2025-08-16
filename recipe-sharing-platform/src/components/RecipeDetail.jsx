import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import data from "../data.json";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const foundRecipe = data.find((r) => r.id === parseInt(id));
    setRecipe(foundRecipe);
  }, [id]);

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-xl">Recipe not found.</p>
        <Link to="/" className="text-blue-500 underline">
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-blue-500 underline">
        ← Back to Recipes
      </Link>

      <div className="bg-white rounded-2xl shadow-lg mt-6 p-6">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-48 h-48 object-contain rounded-lg mx-auto"
        />
        <h1 className="text-3xl font-bold text-center mt-4">{recipe.title}</h1>
        <p className="text-gray-600 text-center mt-2">{recipe.summary}</p>

        {/* Ingredients */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            {recipe.ingredients?.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
          <ol className="list-decimal pl-6 text-gray-700 space-y-2">
            {recipe.instructions?.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
