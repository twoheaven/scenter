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
 * 특정 ID의 필드를 수정하는 비동기 함수입니다.
 * @param {number} id - 수정할 필드의 ID
 * @param {Object} props - 수정할 필드의 속성들
 * @param {File} props.file - 이미지 파일
 * @param {string} props.title - 필드의 제목
 * @param {string} props.date - 필드의 날짜
 * @param {string} props.location - 필드의 장소
 * @param {string} props.casting - 필드의 출연진
 * @returns {Promise<Field>} - 수정된 필드 정보를 담은 Promise
 */
export const putField = async (props: {
  id: number;
  file: File;
  title: string;
  date: string;
  location: string;
  casting: string;
}) => {
  const formData = new FormData();
  formData.append("imageFile", props.file);
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
