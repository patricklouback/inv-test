import axios from 'axios';
import { REGEX_URL } from 'utils/constants';
import { getCookie } from 'utils/storage';
import { GetServerSidePropsContext } from 'next';

const Authorization = getCookie('authentication');
let tennantId;

const API_URL = process.env.NEXT_PUBLIC_API;

const DEFAULT_TENNANT = 'hml';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${Authorization}`,
    tennant: 'default',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async config => {
  if (window) {
    if (!tennantId) {
      const url = window.location.href;

      tennantId = (
        await axios
          .create({
            baseURL: API_URL,
          })
          .get(`/tennants/${REGEX_URL.exec(url) ? REGEX_URL.exec(url)[1] : DEFAULT_TENNANT}`)
      ).data.tennant.id;
    }

    Object.assign(config.headers, {
      tennant: tennantId || 'default',
    });
  }

  return config;
});

export const serverApi = (req: GetServerSidePropsContext['req']) => {
  const Authorization = req.cookies.authentication;
  let tennantId;

  const api = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${Authorization}`,
      tennant: 'default',
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.request.use(async config => {
    if (!tennantId) {
      tennantId = (
        await axios
          .create({
            baseURL: API_URL,
          })
          .get(
            `/tennants/${
              REGEX_URL.exec(req.headers.referer)
                ? REGEX_URL.exec(req.headers.referer)[1]
                : DEFAULT_TENNANT
            }`
          )
      ).data.tennant.id;
    }

    Object.assign(config.headers, {
      tennant: tennantId || 'default',
    });

    return config;
  });

  return api;
};
