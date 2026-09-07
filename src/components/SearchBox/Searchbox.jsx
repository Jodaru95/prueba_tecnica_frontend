import { useState } from "react";
import "./SearchBox.css";

function SearchBox() {
  const [search, setSearch] = useState("");

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
