import axios from 'axios';
import { getCookie } from 'cookies-next';

const Authorization = getCookie('authentication');

let tennantId;

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  headers: {
    Authorization: `Bearer ${Authorization}`,
    tennant: 'default',
  },
});

api.interceptors.request.use(async config => {
  if (window) {
    if (!tennantId) {
      const regex = /https:\/\/(.*?)\.avantti/;

      const url = window.location.href;

      tennantId = (
        await axios
          .create({
            baseURL: process.env.NEXT_PUBLIC_API,
          })
          .get(`/tennants/${regex.exec(url) ? regex.exec(url)[1] : 'hml'}`)
      ).data.tennant.id;
    }

    Object.assign(config.headers, {
      tennant: tennantId || 'default',
    });
  }

  return config;
});
