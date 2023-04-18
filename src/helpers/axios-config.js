import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:'https://backentapi.onrender.com'
});

export {
    axiosInstance
}