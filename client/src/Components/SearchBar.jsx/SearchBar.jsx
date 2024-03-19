// SearchBar.jsx

import styles from "./SearchBar.module.css";
import searchIcon from "/icons/search.png";

const SearchBar = ({ setFilterTerm }) => {
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.trim();
    setFilterTerm(searchTerm);
  };

  return (
    <div className={styles.containerSearchBar}>
      <input
        type="text"
        onChange={handleSearchChange}
        placeholder="Buscar por producto..."
        className={styles.inputSearch}
      />
      <img src={searchIcon} alt="search" className={styles.search} />
    </div>
  );
};

export default SearchBar;
