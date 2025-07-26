import { useParams } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";
import EditRecipeForm from "./EditRecipeForm";
import DeleteRecipeButton from "./DeleteRecipeButton";

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = useRecipeStore((state) =>
    state.recipe.find((recipe) => recipe.id == Number(id))
  );

  if (!recipe) return <p>Recipe not Found.</p>;
  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <EditRecipeForm />
      <DeleteRecipeButton />
    </div>
  );
};
export default RecipeDetails;
