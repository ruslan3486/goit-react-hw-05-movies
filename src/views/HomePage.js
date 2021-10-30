import { useState, useEffect } from "react";
import { useRouteMatch, useLocation } from "react-router-dom";
import MovieList from "../components/MovieList/MovieList";
import * as moviesInfoApi from "../servieces/api";

function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState(null);
  const location = useLocation();
  const { url } = useRouteMatch();

  useEffect(() => {
    moviesInfoApi.getTrending().then((data) => setTrendingMovies(data.results));
  }, []);

  return (
    trendingMovies && (
      <MovieList
        movies={trendingMovies}
        location={location}
        url={`${url}movies`}
      />
    )
  );
}

export default HomePage;
