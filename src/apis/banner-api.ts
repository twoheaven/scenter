import { Banner } from "@/types/interfaces";

import { apiDeleter, apiGetter, apiPoster } from "./interceptor";

/**
 * 모든 배너 정보를 가져오는 비동기 함수입니다.
 * @param {Object} options - 쿼리 옵션
 * @param {string} options.queryKey - 쿼리 키 배열
 * @returns {Promise<Banner[]>} - 배너 목록을 담은 Promise
 */
export const getBanners = async ({ queryKey }: { queryKey: [string] }) => {
  const [,] = queryKey;
  const { data } = await apiGetter<Banner[]>("/api/banners/get");
  return data;
};

/**
 * 특정 ID의 배너 정보를 가져오는 비동기 함수입니다.
 * @param {Object} options - 쿼리 옵션
 * @param {string} options.queryKey - 쿼리 키 배열
 * @returns {Promise<Banner>} - 특정 ID의 배너 정보를 담은 Promise
 */
export const getBanner = async ({
  queryKey,
}: {
  queryKey: [string, number];
}) => {
  const [, id] = queryKey;
  const { data } = await apiGetter<Banner>(`/api/banners/get/${id}`);
  return data;
};

/**
 * 새로운 배너를 등록하는 비동기 함수입니다.
 * @param {Object} props - 배너 등록 시 필요한 속성들
 * @param {File} props.file - 이미지 파일
 * @param {string} props.backColor - 배너의 배경 색상
 * @returns {Promise<Banner>} - 등록된 배너 정보를 담은 Promise
 */
export const postBanner = async (props: { file: File; backColor: string }) => {
  const formData = new FormData();
  formData.append("imageFile", props.file);
  formData.append("backColor", props.backColor);

  const { data } = await apiPoster<Banner>("/api/banners/post", formData);
  return data;
};

/**
 * 특정 ID의 배너를 삭제하는 비동기 함수입니다.
 * @param {Object} options - 삭제할 배너의 ID
 * @param {number} options.id - 삭제할 배너의 ID
 * @returns {Promise<Banner>} - 삭제된 배너 정보를 담은 Promise
 */
export const deleteBanner = async ({ id }: { id: number }) => {
  const { data } = await apiDeleter<Banner>(`/api/banners/delete/${id}`, {
    method: "DELETE",
  });
  return data;
};
