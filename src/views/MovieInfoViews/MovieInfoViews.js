import { useState, useEffect, lazy, Suspense } from "react";
import {
  NavLink,
  useParams,
  useRouteMatch,
  useHistory,
  useLocation,
  Route,
} from "react-router-dom";

import * as api from "../../servieces/api";

import routes from "../../servieces/routes";
import OnLoader from "../../components/Loader/Loader";
import s from "./MovieInfoViews.module.css";

function MovieInfoView() {
  const history = useHistory();
  const location = useLocation();
  const [movieDetails, setMovieDetails] = useState(null);
  const [locState, setLocState] = useState(null);
  const { movieId } = useParams();
  const { path, url } = useRouteMatch();

  const Cast = lazy(() => import("../../components/Cast/Cast"));

  const Review = lazy(() => import("../../components/Review/Review"));
  useEffect(() => {
    api.fetchInfoMovie(movieId).then((data) => {
      setMovieDetails(data);
    });
  }, [movieId]);

  useEffect(() => {
    if (location && location.state && location.state.from) {
      !Object.keys(location.state.from).includes(locState) &&
        setLocState((prevLocState) => ({
          ...prevLocState,
          ...location.state.from,
        }));
    }
  }, [location]);

  const getImgUrl = (size) => {
    return `https://image.tmdb.org/t/p/w${size}`;
  };
  const onGoBack = () => {
    locState ? history.push(locState) : history.push("/");
    // history.push(location?.state?.from ?? routes.home);
    // locState ? history.push(locState) : history.push('/')
    // history.push(location?.state?.from?.location?? '/credits')
  };

  return (
    <>
      {movieDetails && (
        <>
          <button
            type="button"
            onClick={onGoBack}
            className={s.ContainerButton}
          >
            Go back
          </button>

          <div className={s.ContainerMovie}>
            <img
              src={
                movieDetails.poster_path
                  ? `${getImgUrl(342)}${movieDetails.poster_path}`
                  : "not found"
              }
              width={!movieDetails.poster_path ? 342 : null}
              alt=""
              className={s.ContainerImg}
            />
            <div className={s.ContainerInfo}>
              <h1>{movieDetails.title}</h1>
              <p>User Score: {movieDetails.vote_average * 10}%</p>
              <h1>Overview: </h1>
              <p>{movieDetails.overview}</p>
            </div>
            <div className={s.Containerlink}>
              <NavLink
                to={{
                  pathname: `${url}/credits`,
                  state: { from: { locState } },
                }}
                className={s.link}
                activeClassName={s.activeLink}
              >
                Cast
              </NavLink>

              <NavLink
                to={{
                  pathname: `${url}/reviews`,
                  state: {
                    from: { locState },
                  },
                }}
                className={s.link}
                activeClassName={s.activeLink}
              >
                Reviews
              </NavLink>
            </div>
          </div>
          <Suspense fallback={<OnLoader />}>
            <Route path={`${path}/credits`}>
              <Cast movieId={movieId} url={getImgUrl(185)} />
            </Route>

            <Route path={`${path}/reviews`}>
              <Review movieId={movieId} />
            </Route>
          </Suspense>
        </>
      )}
    </>
  );
}
export default MovieInfoView;
