import { useEffect, useState } from "react";
import { fetchGifs } from "./utils/Api";
import SearchBar from "./components/searchBar";
import GifCard from "./components/gifCard";

function App() {
  const [gifs, setGifs] = useState([]);
  const [query, setQuery] = useState(localStorage.getItem("lastSearch") || "");
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadGifs = async (reset = false) => {
    try {
      setLoading(true);
      setError("");
      const newGifs = await fetchGifs(query, reset ? 0 : offset);
      setGifs((prev) => (reset ? newGifs : [...prev, ...newGifs]));
      if (reset) setOffset(12);
      else setOffset((prev) => prev + 12);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGifs(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("lastSearch", query);
  }, [query]);

  const handleSearch = () => {
    setOffset(0);
    loadGifs(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Giphy Search</h1>

      <SearchBar query={query} onChange={setQuery} onSearch={handleSearch} />

      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {gifs.map((gif) => (
          <GifCard key={gif.id} gif={gif} />
        ))}
      </div>

      {gifs.length > 0 && !loading && (
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded"
            onClick={() => loadGifs(false)}
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
