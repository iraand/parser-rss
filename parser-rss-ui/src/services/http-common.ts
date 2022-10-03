import axios from "axios";

export default axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/',
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }

});