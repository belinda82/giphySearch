function SearchBar({ query, onChange, onSearch }) {
  return (
    <div className="flex justify-center">
      <input
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search gifs..."
        className="w-full max-w-md px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={onSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
