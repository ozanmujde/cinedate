import { useState, useEffect } from "react";
import tmdb from "../api/tmdb";

export default () => {
  // to extract the searchApi from the useResults function first take everything associated with
  const [errorMessage, setErrorMessage] = useState(""); // to show error message for user
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [movieInfo, setMovieInfo] = useState({});
  const [moviesInfos, setMoviesInfos] = useState([]);

  const searchMovieApi = async (searchTerm) => {
    try {
      const response = await tmdb.get("/search/movie", {
        params: {
          query: searchTerm,
        },
      });
      setResults(response.data.results);
      setIsLoading(false);
      setErrorMessage("");
    } catch (err) {
      setErrorMessage("Something went wrong");
    }
  };

  const getMovieDetails = async (movieId) => {
    try {
      const response = await tmdb.get(`/movie/${movieId}`);
      setMovieInfo(response.data);
      setIsLoading(false);
      setErrorMessage("");
    } catch (err) {
      setErrorMessage("Something went wrong");
    }
  };

  const getMoviesDetails = async (movieIds) => {
    let movies = [];
    for(let movieId of movieIds) {
      console.log(movieId);
      try {
        const response = await tmdb.get(`/movie/${movieId}`);
        movies.push(response.data);
        setIsLoading(false);
        setErrorMessage("");
      } catch (err) {
        setErrorMessage("Something went wrong");
      }
    }
    console.log("buraya geldi");
    for(let movie of movies) {
      console.log(movie.id, movie.original_title);
    }
    setMoviesInfos(movies);
  };

  return [
    searchMovieApi,
    errorMessage,
    results,
    getMovieDetails,
    getMoviesDetails,
    movieInfo,
    moviesInfos,
    isLoading,
  ]; // 3 things we need in the searchScreen's jsx
};
