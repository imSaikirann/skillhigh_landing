import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL_PRODUCTION;
axios.defaults.baseURL = apiUrl;


axios.defaults.withCredentials = true;

export default axios;
