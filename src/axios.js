import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();
const {REACT_API_API_URL}=process.env
const instance = axios.create({
    baseURL:REACT_API_API_URL
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem("token")
    return config;
})

export default instance;