import { useRecipeStore } from "./recipeStore";
import { Link } from "react-router-dom";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);

  if (!filteredRecipes.length) return <p>No recipes match your search.</p>;
  return (
    // <div>
    //   {recipes.map((recipe) => (
    //     <div key={recipe.id}>
    //       <Link to={`/recipe/${recipe.id}`}>
    //         <h3>{recipe.title}</h3>
    //       </Link>
    //       <p>{recipe.description}</p>
    //     </div>
    //   ))}
    // </div>
    <div>
      {filteredRecipes.map((recipe) => (
        <div key={recipe.id}>
          <Link to={`/recipe/${recipe.id}`}>
            <h3>{recipe.title}</h3>
          </Link>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};
export default RecipeList;
