// Recommend 타입을 정의한 인터페이스를 불러옵니다.
import { Recommend } from "@/types/interfaces";

// API 호출을 담당하는 interceptor 파일로부터 필요한 함수들을 불러옵니다.
import { apiGetter, apiPoster, apiPutter } from "./interceptor";

// GET 메서드를 사용하여 추천 정보를 가져오는 함수입니다.
export const getRecommend = async ({ queryKey }: { queryKey: [string] }) => {
  // queryKey는 사용하지 않으므로 비워둡니다.
  const [,] = queryKey;

  // apiGetter 함수를 사용하여 GET 요청을 수행합니다.
  const { data } = await apiGetter<Recommend>("/api/recommends/get");

  // 가져온 데이터를 반환합니다.
  return data;
};

// POST 메서드를 사용하여 추천 정보를 생성하는 함수입니다.
export const postRecommend = async ({
  recommend,
}: {
  recommend: Omit<Recommend, "id">;
}) => {
  // apiPoster 함수를 사용하여 POST 요청을 수행합니다.
  const { data } = await apiPoster<Recommend>(
    "/api/recommends/post",
    recommend,
  );

  // 생성된 데이터를 반환합니다.
  return data;
};

// PUT 메서드를 사용하여 추천 정보를 업데이트하는 함수입니다.
export const putRecommend = async ({
  recommend,
}: {
  recommend: Omit<Recommend, "id">;
}) => {
  // apiPutter 함수를 사용하여 PUT 요청을 수행합니다.
  const { data } = await apiPutter<Recommend>(`/api/recommends/put`, recommend);

  // 업데이트된 데이터를 반환합니다.
  return data;
};
