import { useState, useEffect } from "react";
import tmdb from "../api/tmdb";

export default () => {
  // to extract the searchApi from the useResults function first take everything associated with
  const [errorMessage, setErrorMessage] = useState(""); // to show error message for user
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [movieInfo, setMovieInfo] = useState({});

  const searchMovieApi = async (searchTerm) => {
    try {
      const response = await tmdb.get("/search/movie", {
        params: {
          query: searchTerm,
        },
      });
      setResults(response.data.results);
      setErrorMessage("");
    } catch (err) {
      setErrorMessage("Something went wrong");
    }
  };

  const getMovieDetails = async (movieId) => {
    try {
      const response = await tmdb.get(`/movie/${movieId}`);
      setMovieInfo(response.data);
      setErrorMessage("");
    } catch (err) {
      setErrorMessage("Something went wrong");
    }
  };

  return [searchMovieApi, errorMessage, results, getMovieDetails, movieInfo]; // 3 things we need in the searchScreen's jsx
};
