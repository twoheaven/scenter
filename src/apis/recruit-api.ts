import { Recruit } from "@/types/interfaces";

import { apiDeleter, apiGetter, apiPoster, apiPutter } from "./interceptor";

/**
 * 모든 채용 정보를 가져오는 비동기 함수입니다.
 * @param {Object} options - 쿼리 옵션
 * @param {string} options.queryKey - 쿼리 키 배열
 * @returns {Promise<Recruit[]>} - 채용 정보 목록을 담은 Promise
 */
export const getRecruits = async ({ queryKey }: { queryKey: [string] }) => {
  const [,] = queryKey;
  const { data } = await apiGetter<Recruit[]>("/api/recruits/get");
  return data;
};

/**
 * 특정 ID의 채용 정보를 가져오는 비동기 함수입니다.
 * @param {Object} options - 쿼리 옵션
 * @param {string} options.queryKey - 쿼리 키 배열
 * @returns {Promise<Recruit>} - 특정 ID의 채용 정보를 담은 Promise
 */
export const getRecruit = async ({
  queryKey,
}: {
  queryKey: [string, number];
}) => {
  const [, id] = queryKey;
  const { data } = await apiGetter<Recruit>(`/api/recruits/get/${id}`);
  return data;
};

/**
 * 새로운 채용 정보를 등록하는 비동기 함수입니다.
 * @param {Object} options - 채용 정보 등록 시 필요한 속성들
 * @param {Recruit} options.recruit - 등록할 채용 정보 객체 (ID 제외)
 * @returns {Promise<Recruit>} - 등록된 채용 정보를 담은 Promise
 */
export const postRecruit = async ({
  recruit,
}: {
  recruit: Omit<Recruit, "id">;
}) => {
  const { data } = await apiPoster<Recruit>("/api/recruits/post", recruit);
  return data;
};

/**
 * 특정 ID의 채용 정보를 수정하는 비동기 함수입니다.
 * @param {Object} options - 수정할 채용 정보와 ID
 * @param {Recruit} options.recruit - 수정할 채용 정보 객체 (ID 포함)
 * @returns {Promise<Recruit>} - 수정된 채용 정보를 담은 Promise
 */
export const putRecruit = async ({
  recruit: { id, ...rest },
}: {
  recruit: Recruit;
}) => {
  const { data } = await apiPutter<Recruit>(`/api/recruits/put/${id}`, rest);
  return data;
};

/**
 * 특정 ID의 채용 정보를 삭제하는 비동기 함수입니다.
 * @param {Object} options - 삭제할 채용 정보의 ID
 * @param {number} options.id - 삭제할 채용 정보의 ID
 * @returns {Promise<Recruit>} - 삭제된 채용 정보를 담은 Promise
 */
export const deleteRecruit = async ({ id }: { id: number }) => {
  const { data } = await apiDeleter<Recruit>(`/api/recruits/delete/${id}`, {
    method: "DELETE",
  });
  return data;
};
