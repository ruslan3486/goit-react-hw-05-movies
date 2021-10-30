import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./SearchBar.module.css";
import "react-toastify/dist/ReactToastify.css";
const Searchbar = ({ onSubmit }) => {
  // state = {
  //   SearchName: "",
  // };
  const [query, setQuery] = useState("");

  const handleNameChange = ({ currentTarget }) => {
    // this.setState({ SearchName: event.currentTarget.value.toLowerCase() });

    setQuery(currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim() === "") {
      toast.error("Wow so easy!");
      return;
    }
    onSubmit(query);
    setQuery("");
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.SearchFormButton}>
          Search
        </button>

        <input
          className={styles.SearchFormInput}
          type="text"
          value={query}
          placeholder="Search images and photos"
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;
