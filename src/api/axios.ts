import axios from "axios";
const url2 = "http://localhost:8000/api/"

export const api = axios.create({
    baseURL: url2,
    withCredentials: true,
})

api.interceptors.request.use((config) => {
    const token = getCookie('csrftoken');
    if (token && config.method !== 'get') {
        config.headers['X-CSRFToken'] = token;
    }
    return config;
});

function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
}
