import  { useState, useEffect } from "react";
import yelp from "../api/yelp";
import tmdb from "../api/tmdb";

export default () => {
  // to extract the searchApi from the useResults function first take everything associated with
  //searchApi and put them into useREsults.js
  const [errorMessage, setErrorMessage] = useState(""); // to show error message for user
  const [results, setResults] = useState([]);

  const searchApi = async (searchTerm) => {
    try {
      const responce = await tmdb.get("/search/movie", {
        params: {
          // any key value pair can be passed to url with that like search?limit=50
          limit: 50,
          query: searchTerm,
        },
      });
      console.log(responce.data);
      setResults(responce.data.results);
    } catch (err) {
      setErrorMessage("Something went wrong");
    }
  };
  //BAD CODE
  //searchApi('pasta'); ll give repetetive result like search pasta 10 times in a sec etc
  // Never call directly func for inital state
  //Good code
//   useEffect(() => {
//     searchApi("pasta");
//   }, []); // this will call searchApi only when term changes and in the init render

  return [searchApi, errorMessage, results]; // 3 things we need in the searchScreen's jsx
};