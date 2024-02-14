import { useState } from "react";

export const AdminSearchBooking = ({ handleSearch }: { handleSearch: (term: string) => void}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Skriv in namn för att söka..."
      />
      <button type="submit">Sök</button>
    </form>
  );
};
