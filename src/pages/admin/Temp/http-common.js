import axios from "axios";

export default axios.create({
  baseURL: "http://dolbomi.site/",
  headers: {
    "Content-type": "application/json",
  },
});