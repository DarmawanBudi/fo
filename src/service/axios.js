import axios from "axios";
const api_url = "https://project-alfabank.herokuapp.com/api/v1";
// const api_url = "http://192.168.11.41:8000/api/v1";


// const api_url = "http://192.168.11.31:8000/api/v1";

axios.defaults.baseURL = api_url;

export default axios