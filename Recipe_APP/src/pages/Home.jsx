import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import RecipeCard from "../components/RecipeCard";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

const API_KEY = import.meta.env.VITE_API_KEY;
  const fetchData = async () => {
    if (!searchTerm) return;

    setLoading(true);

    try {
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch`,
        {
          params: {
            query: searchTerm,
            number: 5,
            apiKey: API_KEY,
          },
        }
      );
      setRecipes(res.data.results);
    } catch (error) {
      console.log("failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  return (
    <>
      <div className="container">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {loading ? (
          <LoadingSpinner />
        ) : (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        )}
      </div>
    </>
  );
}

export default Home;
