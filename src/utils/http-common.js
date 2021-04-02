import axios from "axios";

export default axios.create({
  baseURL: "http://research-backend-dev.herokuapp.com/api/",
  headers: {
    "Content-type": "application/json",
  },
});
