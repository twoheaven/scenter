import { apiPoster } from "./interceptor";

/**
 * 로그인 요청을 처리하는 함수입니다.
 * @param {Object} credentials - 사용자의 로그인 정보를 담은 객체
 * @param {string} credentials.username - 사용자명
 * @param {string} credentials.password - 비밀번호
 * @returns {Promise<boolean>} - 로그인 성공 여부를 나타내는 Promise
 */
export const postLogin = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    // API를 호출하여 사용자 인증을 시도합니다.
    const { data } = await apiPoster<{ token: string }>("/api/authenticate", {
      username,
      password,
    });

    // 인증 성공 시, 받아온 토큰을 로컬 스토리지에 저장합니다.
    localStorage.setItem("access_token", data.token);

    // 로그인 성공을 나타내는 값을 반환합니다.
    return true;
  } catch (error) {
    // 로그인 중 에러가 발생한 경우, 적절한 예외 처리를 수행합니다.
    console.error("로그인 중 오류 발생:", error);
    throw error; // 에러를 상위 호출자에게 전파합니다.
  }
};
