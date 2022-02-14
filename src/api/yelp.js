import axios from "axios";

export default axios.create({
  baseURL: "https://api.yelp.com/v3/businesses", // rootURL .search add things after it
  headers: {
    Authorization:
      "Bearer PX5lN4o-257YD1Bacv_RACSejLQ037tRgEjk5Ut1pkRRGkaDNioJvLHwqyXlPFbtS1Pm6PIa48bolbvRvJhhfIR2sQLwDufseeLzdgdH6YJ1v5BcWurbL_IM-fj3YXYx",
    
    },
});
