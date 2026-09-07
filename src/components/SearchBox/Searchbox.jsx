import { useState } from "react";

function SearchBox() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Buscar..."
      />
    </div>
  );
}

export default SearchBox;
