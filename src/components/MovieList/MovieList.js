import { NavLink } from "react-router-dom";
import s from "./MovieList.module.css";

function MovieList({ movies, url, location }) {
  return (
    <>
      <h1 className={s.titleName}>Trending today</h1>
      <ul className={s.FilmList}>
        {movies.map((movie) => (
          <li key={movie.id} className={s.FilmList_Item}>
            <NavLink
              to={{
                pathname: `${url}/${movie.id}`,
                state: { from: location },
              }}
              className={s.FilmLink}
            >
              {movie.title}
              {/* <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt=''
                 className={s.FilmList_img}
                 
                /> */}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
}

export default MovieList;
