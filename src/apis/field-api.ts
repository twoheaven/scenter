import axios, { AxiosResponse } from "axios";

import { Field } from "@/types/interfaces";

import { apiGetter, apiPutter } from "./interceptor";

/**
 * 모든 배너 정보를 가져오는 비동기 함수입니다.
 * @param {Object} options - 쿼리 옵션
 * @param {string} options.queryKey - 쿼리 키 배열
 * @returns {Promise<Field[]>} - 배너 목록을 담은 Promise
 */
export const getFields = async ({ queryKey }: { queryKey: [string] }) => {
  const [,] = queryKey;
  const { data } = await apiGetter<Field[]>("/api/fields/get");
  return data;
};

/**
 * 특정 ID의 배너 정보를 가져오는 비동기 함수입니다.
 * @param {Object} options - 쿼리 옵션
 * @param {string} options.queryKey - 쿼리 키 배열
 * @returns {Promise<Field>} - 특정 ID의 필드 정보를 담은 Promise
 */
export const getField = async ({
  queryKey,
}: {
  queryKey: [string, { id: number }];
}) => {
  const [, id] = queryKey;
  const { data } = await apiGetter<Field>(`/api/fields/get/${id}`);
  return data;
};

/**
 * 특정 ID의 필드 이미지를 수정하는 비동기 함수입니다.
 * @param {number} props.id - 수정할 필드의 ID
 * @param {File} props.image - 이미지 파일
 * @returns {Promise<Field>} - 수정된 필드 정보를 담은 Promise
 */
export const putFieldImage = async (props: { id: number; image: File }) => {
  const { id, image } = props;

  // 로컬 스토리지에서 토큰을 가져옵니다.
  const token = localStorage.getItem("access_token");

  try {
    const formData = new FormData();
    formData.append("file", image);

    // 토큰이 존재하면 요청 헤더에 추가합니다.
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    if (token) {
      (config.headers as any)["Authorization"] = `Bearer ${token}`;
    }

    const response: AxiosResponse = await axios.put(
      `https://cat-project.xyz/api/fields/put/${id}/image`,
      formData,
      config,
    );

    if (response.status !== 200) {
      throw new Error("이미지 업로드에 실패했습니다");
    }

    const data = response.data;
    return data;
  } catch (error: any) {
    // Unauthorized (401) 에러가 발생하면 토큰을 삭제하고 로그인 페이지로 이동합니다.
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }
    throw new Error("이미지 업로드에 실패했습니다");
  }
};

/**
 * 특정 ID의 필드를 수정하는 비동기 함수입니다.
 * @param {number} props.id - 수정할 필드의 ID
 * @param {Object} props - 수정할 필드의 속성들
 * @param {File} props.file - 이미지 파일
 * @param {string} props.title - 필드의 제목
 * @param {string} props.date - 필드의 날짜
 * @param {string} props.location - 필드의 장소
 * @param {string} props.casting - 필드의 출연진
 * @returns {Promise<Field>} - 수정된 필드 정보를 담은 Promise
 */
export const putFieldDetails = async (props: {
  id: number;
  title: string;
  date: string;
  location: string;
  casting: string;
}) => {
  const formData = new FormData();
  formData.append("title", props.title);
  formData.append("date", props.date);
  formData.append("location", props.location);
  formData.append("casting", props.casting);
  const { data } = await apiPutter<Field>(
    `/api/fields/put/${props.id}`,
    formData,
  );
  return data;
};
