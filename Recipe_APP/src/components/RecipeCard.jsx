import { Link } from "react-router-dom";
function RecipeCard({ recipe }) {
  return (
    <>
      <div className="RecipeCard">
        <img src={recipe.image} alt={recipe.title} />
        <h2>{recipe.title}</h2>
        <Link to={`/recipe/${recipe.id}`}>
          <button>Show Instructions</button>
        </Link>
      </div>
    </>
  );
}

export default RecipeCard;
