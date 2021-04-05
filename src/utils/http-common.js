import axios from "axios";

export default axios.create({
  baseURL: "https://research-backend-dev.herokuapp.com/",
  headers: {
    "Content-type": "application/json",
  },
});
