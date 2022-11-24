import axios from "axios";

const http = axios.create({
  baseURL: "https://104.199.145.44:6600",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default http