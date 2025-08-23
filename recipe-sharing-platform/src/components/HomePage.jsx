import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import data from "../data.json";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(data);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">🍽️ Recipes</h1>
      <div className="text-center mb-6">
        <Link
          to="/add"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          ➕ Add New Recipe
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Link
            to={`/recipe/${recipe.id}`}
            key={recipe.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transform transition duration-300"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-24 h-24 object-contain rounded-lg mx-auto mt-4"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <p className="text-gray-600">{recipe.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
