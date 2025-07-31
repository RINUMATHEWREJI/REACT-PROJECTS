function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <>
      <input
        type="text"
        placeholder="enter your recipes"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        className="searchBar"
      />
    </>
  );
}

export default SearchBar;
