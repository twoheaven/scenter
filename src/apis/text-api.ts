import { ListResponse, Team } from "@/types/interfaces";

import { apiDeleter, apiGetter, apiPoster, apiPutter } from "./interceptor";

/**
 * 팀 정보를 등록하는 비동기 함수입니다.
 * @param {Object} props - 팀 정보 등록 시 필요한 속성들
 * @param {string} props.division - 팀 소속 부서
 * @param {string} props.teamName - 팀명
 * @param {string} props.shortIntro - 짧은 소개
 * @param {number} props.teamMany - 팀 인원
 * @param {string} props.longIntro - 긴 소개
 * @param {string} props.portfolio - 포트폴리오 링크
 * @param {string} props.repertoire - 레퍼토리
 * @param {string} props.equipment - 사용 장비
 * @returns {Promise<Team>} - 등록된 팀 정보를 담은 Promise
 */
export const postText = async (props: {
  division: string;
  teamName: string;
  shortIntro: string;
  teamMany: number;
  longIntro: string;
  portfolio: string;
  repertoire: string;
  equipment: string;
}) => {
  const { data } = await apiPoster<Team>("/api/texts/post", props);
  return data;
};

/**
 * 특정 ID의 팀 정보를 수정하는 비동기 함수입니다.
 * @param {Object} props - 수정할 팀 정보와 ID
 * @param {number} props.id - 수정할 팀 정보의 ID
 * @param {string} props.division - 팀 소속 부서
 * @param {string} props.teamName - 팀명
 * @param {string} props.shortIntro - 짧은 소개
 * @param {number} props.teamMany - 팀 인원
 * @param {string} props.longIntro - 긴 소개
 * @param {string} props.portfolio - 포트폴리오 링크
 * @param {string} props.repertoire - 레퍼토리
 * @param {string} props.equipment - 사용 장비
 * @returns {Promise<Team>} - 수정된 팀 정보를 담은 Promise
 */
export const putText = async (props: {
  id: number;
  division: string;
  teamName: string;
  shortIntro: string;
  teamMany: number;
  longIntro: string;
  portfolio: string;
  repertoire: string;
  equipment: string;
}) => {
  const { id, ...body } = props;
  const { data } = await apiPutter<Team>("/api/texts/put/" + id, body);
  return data;
};

/**
 * 특정 ID의 팀 정보를 가져오는 비동기 함수입니다.
 * @param {Object} options - 쿼리 옵션
 * @param {string} options.queryKey - 쿼리 키 배열
 * @returns {Promise<Team>} - 특정 ID의 팀 정보를 담은 Promise
 */
export const getText = async ({
  queryKey,
}: {
  queryKey: [string, { id: number }];
}) => {
  const [, { id }] = queryKey;
  const { data } = await apiGetter<Team>(`/api/texts/get/${id}`);
  return data;
};

/**
 * 모든 팀 정보를 가져오는 비동기 함수입니다.
 * @param {Object} options - 쿼리 옵션
 * @param {string} options.queryKey - 쿼리 키 배열
 * @returns {Promise<ListResponse<Team>>} - 팀 정보 목록을 담은 Promise
 */
export const getTexts = async ({
  queryKey,
}: {
  queryKey: [string, { page?: number; size?: number }?];
}) => {
  const [, { page, size } = { page: 0, size: 1000 }] = queryKey;
  const { data } = await apiGetter<ListResponse<Team>>(
    `/api/texts/get?page=${page}&size=${size}`,
  );
  return data;
};

/**
 * 검색 키워드를 이용하여 팀 정보를 검색하는 비동기 함수입니다.
 * @param {Object} options - 검색 옵션
 * @param {string} options.queryKey - 검색 쿼리 키 배열
 * @returns {Promise<Team[]>} - 검색된 팀 정보 목록을 담은 Promise
 */
export const searchTexts = async ({
  queryKey,
}: {
  queryKey: [
    string,
    {
      searchKeyword: string;
    },
  ];
}) => {
  const [, { searchKeyword }] = queryKey;
  const { data } = await apiGetter<Team[]>(
    `/api/texts/get/search?keyword=${searchKeyword}`,
  );
  return data;
};

/**
 * 특정 ID의 팀 정보를 삭제하는 비동기 함수입니다.
 * @param {Object} options - 삭제할 팀 정보의 ID
 * @param {number} options.id - 삭제할 팀 정보의 ID
 * @returns {Promise<Team>} - 삭제된 팀 정보를 담은 Promise
 */
export const deleteText = async ({ id }: { id: number }) => {
  const { data } = await apiDeleter<Team>(`/api/texts/delete/${id}`);
  return data;
};

/**
 * 특정 팀에 대한 메인 사진을 업로드하는 비동기 함수입니다.
 * @param {Object} props - 업로드할 이미지와 팀 ID
 * @param {number} props.id - 팀 ID
 * @param {File} props.image - 업로드할 이미지 파일
 * @returns {Promise<Team>} - 업로드된 팀 정보를 담은 Promise
 */
export const postMainPicture = async (props: { id: number; image: File }) => {
  const { id, image } = props;
  const formData = new FormData();
  formData.append("imageFile", image);
  const { data } = await apiPoster<Team>(
    `/api/texts/post/${id}/main-picture`,
    formData,
  );
  return data;
};

/**
 * 특정 팀에 대한 메인 사진을 수정하는 비동기 함수입니다.
 * @param {Object} props - 수정할 이미지와 팀 ID
 * @param {number} props.id - 팀 ID
 * @param {File} props.image - 수정할 이미지 파일
 * @returns {Promise<Team>} - 수정된 팀 정보를 담은 Promise
 */
export const putMainPicture = async (props: { id: number; image: File }) => {
  const { id, image } = props;
  const formData = new FormData();
  formData.append("imageFile", image);
  const { data } = await apiPutter<Team>(
    `/api/texts/put/${id}/main-picture`,
    formData,
  );
  return data;
};

/**
 * 특정 팀에 대한 서브 사진을 업로드하는 비동기 함수입니다.
 * @param {Object} props - 업로드할 이미지와 팀 ID
 * @param {number} props.id - 팀 ID
 * @param {File} props.image - 업로드할 이미지 파일
 * @returns {Promise<Team>} - 업로드된 팀 정보를 담은 Promise
 */
export const postSubPicture = async (props: { id: number; image: File }) => {
  const { id, image } = props;
  const formData = new FormData();
  formData.append("imageFile", image);
  const { data } = await apiPoster<Team>(
    `/api/texts/post/${id}/sub-pictures`,
    formData,
  );
  return data;
};

/**
 * 특정 팀의 서브 사진을 삭제하는 비동기 함수입니다.
 * @param {Object} props - 삭제할 이미지의 ID와 팀 ID
 * @param {number} props.id - 팀 ID
 * @param {number} props.subPictureId - 삭제할 서브 사진의 ID
 * @returns {Promise<Team>} - 삭제된 팀 정보를 담은 Promise
 */
export const deleteSubPicture = async ({
  id,
  subPictureId,
}: {
  id: number;
  subPictureId: number;
}) => {
  const { data } = await apiDeleter<Team>(
    `/api/texts/delete/${id}/sub-pictures/${subPictureId}`,
  );
  return data;
};

/**
 * 특정 팀에 대한 유튜브 비디오를 업로드하는 비동기 함수입니다.
 * @param {Object} props - 업로드할 비디오 링크와 팀 ID
 * @param {number} props.id - 팀 ID
 * @param {string} props.youtubeLink - 업로드할 유튜브 비디오 링크
 * @returns {Promise<Team>} - 업로드된 팀 정보를 담은 Promise
 */
export const postVideo = async (props: { id: number; youtubeLink: string }) => {
  const { id, youtubeLink } = props;
  const { data } = await apiPoster<Team>(`/api/texts/post/${id}/videos`, {
    youtubeLink,
  });
  return data;
};

/**
 * 특정 팀의 유튜브 비디오를 삭제하는 비동기 함수입니다.
 * @param {Object} props - 삭제할 비디오의 ID와 팀 ID
 * @param {number} props.id - 팀 ID
 * @param {number} props.videoId - 삭제할 유튜브 비디오의 ID
 * @returns {Promise<Team>} - 삭제된 팀 정보를 담은 Promise
 */
export const deleteVideo = async ({
  id,
  videoId,
}: {
  id: number;
  videoId: number;
}) => {
  const { data } = await apiDeleter<Team>(
    `/api/texts/delete/${id}/videos/${videoId}`,
  );
  return data;
};
