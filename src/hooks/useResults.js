import { useState, useEffect } from "react";
import tmdb from "../api/tmdb";

export default () => {
  // to extract the searchApi from the useResults function first take everything associated with
  const [errorMessage, setErrorMessage] = useState(""); // to show error message for user
  const [results, setResults] = useState([]);

  const searchMovieApi = async (searchTerm) => {
    try {
      const response = await tmdb.get("/search/movie", {
        params: {
          query: searchTerm,
        },
      });
      // console.log(response.data);
      setResults(response.data.results);
    } catch (err) {
      setErrorMessage("Something went wrong");
    }
  };

  return [searchMovieApi, errorMessage, results]; // 3 things we need in the searchScreen's jsx
};
