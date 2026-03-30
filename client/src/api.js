import axios from "axios";

const API = axios.create({
  baseURL: "https://portfolio-zwya.onrender.com/api"
});

export default API;