import axios from "axios";

const url = `${process.env.REACT_APP_HTTP}://${process.env.REACT_APP_HOST}`;

export const axiosHttp = axios.create({
    baseURL: url,
    headers:{
        'Content-Type' : 'application/json;charset=UTF-8'
    }
})

export const axiosAuth = axios.create({
    baseURL: url,
    headers:{
        'Content-Type' : 'application/json;charset=UTF-8'
    }
})

axiosAuth.interceptors.request.use(
    (config:any) => {
        const token = localStorage.getItem('token');
        if(!token){
            return Promise.reject('login'); // e = 'login'으로 익셉션
        }
        config.headers.Authorization = token;
        return config;
    },
    (err:any) => {
        return Promise.reject(err);
    }
)