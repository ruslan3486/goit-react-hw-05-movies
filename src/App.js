import { Switch, Route } from "react-router-dom";
import AppBar from "./components/AppBar/AppBar";
import HomePage from "./views/HomePage";
import MoviesPage from "./views/MoviesPage/MoviesPage";
import MovieInfoView from "./views/MovieInfoViews/MovieInfoViews";

function App() {
  return (
    <>
      <AppBar />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>

        <Route exact path="/movies">
          <MoviesPage />
        </Route>
      </Switch>

      <Route path="/movies/:movieId">
        <MovieInfoView />
      </Route>
    </>
  );
}

export default App;
