import axios from "axios";

export default axios.create({
  baseURL: "https://wlobby-backend.herokuapp.com/",
});
