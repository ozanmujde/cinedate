import axios from "axios";

export default axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOWYwOGI3ODM1YjkwNWNlZDUyNjE2MTEwYTk3YTNjOCIsInN1YiI6IjYwOWMwNmUxYzUxYWNkMDAyOWRkOWNlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1qOyAlMTw7Oe5ba-TEXmoONjOP9jDLczG4TVsFl9Kk8",
  },
});
