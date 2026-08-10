import axios from "axios";

let axiosInstance=axios.create({
    baseURL="http://localhost:8007/api"
})

export default axiosInstance;