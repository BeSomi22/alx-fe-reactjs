import { useRecipeStore } from "./recipeStore";

const SearchBar = () => {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);

  return (
    <input
      type="text"
      placeholder="Search recipes..."
      onChange={(event) => setSearchTerm(event.target.value)}
      style={{ padding: "10px", width: "100%", marginBottom: "20px" }}
    />
  );
};

export default SearchBar;
