import axios, { AxiosResponse } from "axios";

// Axios 인스턴스 생성
const interceptor = axios.create();

// Request Interceptor: 요청 전에 실행되는 부분
interceptor.interceptors.request.use(
  (config) => {
    // Do something before request is sent

    // 로컬 스토리지에서 토큰을 가져옵니다.
    const token = localStorage.getItem("access_token");

    // 토큰이 존재하면 요청 헤더에 추가합니다.
    if (token) {
      config.headers.authorization = "Bearer " + token;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Response Interceptor: 응답 후 실행되는 부분
interceptor.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    // Unauthorized (401) 에러가 발생하면 토큰을 삭제하고 로그인 페이지로 이동합니다.
    if (error.response.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

/**
 * GET 요청을 수행하는 함수
 * @param {string} path - 요청 경로
 * @param {any} params - 쿼리 파라미터
 * @returns {Promise<AxiosResponse<T>>} - GET 요청 결과를 담은 Promise
 */
export const apiGetter = async <T>(
  path: string,
  params?: any,
): Promise<AxiosResponse<T>> => {
  return await interceptor.get(import.meta.env.VITE_DOMAIN + path, { params });
};

/**
 * POST 요청을 수행하는 함수
 * @param {string} path - 요청 경로
 * @param {any} data - 요청 데이터
 * @returns {Promise<AxiosResponse<T>>} - POST 요청 결과를 담은 Promise
 */
export const apiPoster = async <T>(
  path: string,
  data?: any,
): Promise<AxiosResponse<T>> => {
  return await interceptor.post(import.meta.env.VITE_DOMAIN + path, data);
};

/**
 * PATCH 요청을 수행하는 함수
 * @param {string} path - 요청 경로
 * @param {any} data - 요청 데이터
 * @returns {Promise<AxiosResponse<T>>} - PATCH 요청 결과를 담은 Promise
 */
export const apiPatcher = async <T>(
  path: string,
  data?: any,
): Promise<AxiosResponse<T>> => {
  return await interceptor.patch(import.meta.env.VITE_DOMAIN + path, data);
};

/**
 * PUT 요청을 수행하는 함수
 * @param {string} path - 요청 경로
 * @param {any} data - 요청 데이터
 * @returns {Promise<AxiosResponse<T>>} - PUT 요청 결과를 담은 Promise
 */
export const apiPutter = async <T>(
  path: string,
  data?: any,
): Promise<AxiosResponse<T>> => {
  return await interceptor.put(import.meta.env.VITE_DOMAIN + path, data);
};

/**
 * DELETE 요청을 수행하는 함수
 * @param {string} path - 요청 경로
 * @param {any} data - 요청 데이터
 * @returns {Promise<AxiosResponse<T>>} - DELETE 요청 결과를 담은 Promise
 */
export const apiDeleter = async <T>(
  path: string,
  data?: any,
): Promise<AxiosResponse<T>> => {
  return await interceptor.delete(import.meta.env.VITE_DOMAIN + path, data);
};
