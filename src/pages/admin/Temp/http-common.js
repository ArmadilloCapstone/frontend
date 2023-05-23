import axios from "axios";

export default axios.create({
  baseURL: "http://13.209.104.24:8080",
  headers: {
    "Content-type": "application/json",
  },
});