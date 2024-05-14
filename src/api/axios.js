import axios from "axios";

export default axios.create({
    baseURL: 'http://165.22.72.60:8080/api/user'
})