import "./SearchBox.css";

function SearchBox({ search, setSearch }) {
  return (
    <div>
      <input
        className="search-input"
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Buscar..."
      />
    </div>
  );
}

export default SearchBox;
