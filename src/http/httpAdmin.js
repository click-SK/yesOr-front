import axios from 'axios';
import { BASE_URL } from './baseUrl';

// Імпортуємо CancelToken для підтримки скасування запитів
const { CancelToken } = axios;

const $api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL
});

// Додаємо інтерсептор для додавання токену авторизації до заголовків запитів
$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('Y-R-A-T')}`;
  return config;
});

$api.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  const originalRequest = error.config;
  if(error.response.status == 403 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    const response = await axios.get(`${BASE_URL}/refresh-admin`,{withCredentials: true})
    localStorage.setItem('Y-R-A-T',response.data.accessToken)
    return $api.request(originalRequest);
  }
})

// Додаємо можливість скасування запитів через CancelToken
$api.CancelToken = CancelToken;
$api.isCancel = axios.isCancel;

export default $api;