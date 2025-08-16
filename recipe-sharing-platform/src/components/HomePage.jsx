import { useState, useEffect } from "react";
import data from "../data.json"; // Import mock data

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Load recipes from mock data
    setRecipes(data);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">🍽️ Recipes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transform transition duration-300"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-1/4 h-auto object-cover rounded-lg mx-auto mt-4"
              //   className="w-[20%]h-[20%] rounded-t-2xl"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <p className="text-gray-600">{recipe.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
