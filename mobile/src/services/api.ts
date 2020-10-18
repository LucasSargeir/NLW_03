import axio from 'axios';

const api = axio.create({
    baseURL: "http:192.168.15.7:7777",
})

export default api;