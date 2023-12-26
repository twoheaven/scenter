import { apiPoster } from "./interceptor";

/**
 * 이메일을 전송하는 비동기 함수입니다.
 * @param {Object} options - 이메일 전송 시 필요한 정보
 * @param {string} options.subject - 이메일 제목
 * @param {string} options.text - 이메일 본문 내용
 * @returns {Promise<any>} - 이메일 전송 결과를 담은 Promise
 */
export const postEmail = ({
  subject,
  text,
}: {
  subject: string;
  text: string;
}) => {
  return apiPoster("/api/send-email", { subject, text });
};
