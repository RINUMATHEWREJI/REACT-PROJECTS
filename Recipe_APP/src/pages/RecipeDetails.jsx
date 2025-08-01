import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_API_KEY;


  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information`,
          {
            params: { apiKey: API_KEY },
          }
        );
        setRecipe(res.data);
      } catch (error) {
        console.log("Error loading recipe", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div className="recipe-detail">
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
      <p>
        <strong>Ready in:</strong> {recipe.readyInMinutes} mins
      </p>
      <p>
        <strong>Ingredients:</strong>
      </p>
      <ul>
        {recipe.extendedIngredients.map((item) => (
          <li key={item.id}>{item.original}</li>
        ))}
      </ul>
      <p>
        <strong>Instructions:</strong>
      </p>
      <div
        dangerouslySetInnerHTML={{
          __html: recipe.instructions || "<p>No instructions found.</p>",
        }}
      ></div>

      <a href={recipe.sourceUrl} target="_blank" rel="noreferrer">
        Full Recipe
      </a>
    </div>
  );
}

export default RecipeDetails;
