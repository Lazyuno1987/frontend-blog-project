import axios from "axios";

const instance = axios.create({
    //  baseURL:"https://backend-blog-project-laziun.herokuapp.com/"
    baseURL:"https://backend-blog-project-production.up.railway.app/"
//    baseURL: "https://scarlet-bee-kilt.cyclic.app/"
    //  baseURL:'http://localhost:4444/'
    
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem("token")
    return config;
})

export default instance;