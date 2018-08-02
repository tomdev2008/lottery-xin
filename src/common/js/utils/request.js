import axios from 'axios'
import qs from "qs";
const service = axios.create({
    timeout: 10000,
    withCredentials: true, // 是否允许带cookie这些
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }
})

// request interceptor
service.interceptors.request.use(config => {
    if (
        config.method === "post" ||
        config.method === "put" ||
        config.method === "delete"
    ) {
        // 序列化
        //config.data = qs.stringify(config.data);
    }

    // 若是有做鉴权token , 就给头部带上token
    if (localStorage.token) {
        config.headers.Authorization = localStorage.token;
    }
    return config;
}, error => {
    // Do something with request error
    console.log(error) // for debug
    alert(error.data.error.message)
    return Promise.reject(error.data.error.message);
    Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.code == 200) {
            return response;
        } else {
            //alert(res.msg)
            return Promise.reject(res);
        }
    },
    error => {
        console.log('err' + error)// for debug
        return Promise.reject(error)
    })

export default service
