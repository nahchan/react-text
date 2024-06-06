
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000';
axios.interceptors.request.use((config) => {
    return config
});
axios.interceptors.response.use((response) => {
    if(response.data.status === 20001){ // 全局异常处理

    }
    return response.data
},err => {
    return Promise.reject(err);
});

export default axios;
