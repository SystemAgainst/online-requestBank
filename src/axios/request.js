import axios from "axios";
import router from '@/router/index.js';

const VUE_APP_FB_URL = `https://vue-online-bank-5ba3f-default-rtdb.firebaseio.com/`;

const requestAxios = axios.create({
  baseURL: VUE_APP_FB_URL,
});

// Add a response interceptor
requestAxios.interceptors.response.use(null, error => {
  if (error.response.status === 401) {
    router.push('/auth?message=auth')
  }

  return Promise.reject(error)
})

export default requestAxios;
