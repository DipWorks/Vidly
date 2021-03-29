import http from "./httpService";

const apiEndpoint = "/movies";

function movieUrl(movieId) {
  return `${apiEndpoint}/${movieId}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export async function saveMovie(movie) {
  // if the movie already exists, then send a put request
  if (movie._id) {
    // the movie object is part of the state on where it's called from
    // so we do not wanna change the movie object directly
    const body = { ...movie };
    delete body._id;

    return http.put(movieUrl(movie._id), body);
  }
  return http.post(apiEndpoint, movie);
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}
