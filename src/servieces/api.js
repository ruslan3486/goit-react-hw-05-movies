const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "65a36cf7a59f445bb97e40fad9e22f6c";

async function fetchHandler(url = "") {
  const response = await fetch(url);
  return response.ok ? response.json() : Promise.reject(new Error("Not found"));
}

export const getTrending = () => {
  return fetchHandler(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
};

export const fetchMoviesSearch = (query) => {
  return fetchHandler(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
  );
};

export const fetchInfoMovie = (id) => {
  return fetchHandler(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
  );
};

// export const fetchMovieDetails = (id) => {

//   return fetchHandler()
// }

export const fetchMovieCredits = (id) => {
  return fetchHandler(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
  );
};

export const fetchMovieReview = (id) => {
  return fetchHandler(
    `${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  );
};
