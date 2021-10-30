import { useState, useEffect } from "react";
import { useRouteMatch, useHistory, useLocation } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import Searchbar from "../../components/SearchBar/SearchBar";
import * as ApiServiese from "../../servieces/api";

function MoviesPage() {
  const [searchData, setSearchData] = useState(null);
  const { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const searchQuery = new URLSearchParams(location.search).get("query") ?? "";

  useEffect(() => {
    searchQuery &&
      ApiServiese.fetchMoviesSearch(searchQuery).then((data) => {
        setSearchData(data.results);
        history.push({ ...location, search: "" });
      });
  }, [history, location, searchQuery]);

  const onSubmit = (query) => {
    query && history.push({ ...location, search: `query=${query}` });
  };
  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      {searchData && searchData.length !== 0 ? (
        <MovieList movies={searchData} url={url} location={location} />
      ) : (
        <p>
          {searchData && searchData.length === 0
            ? "There are no matching results for your search."
            : "There is nothing here yet..."}
        </p>
      )}
    </>
  );
}

export default MoviesPage;
