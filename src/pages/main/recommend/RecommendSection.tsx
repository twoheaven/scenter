import {
  Area,
  Button,
  Content,
  Flex,
  Grid,
  Highlight,
  Input,
  Spacer,
  Text,
} from "@dohyun-ko/react-atoms";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

import {
  getRecommend,
  postRecommend,
  putRecommend,
} from "@/apis/recommend-api";
import WrapperLink from "@/components/wrapperLink/WrapperLink";
import useIsMobile from "@/hooks/useIsMobile";
import colorSet from "@/styles/color-set";
import Fonts from "@/styles/fonts";
import Paths from "@/types/paths";
import QueryKeys from "@/types/queryKeys";
import { isLoggedIn } from "@/utils/utils";

import RecommendItem from "./RecommendItem";

// RecommendSection 컴포넌트 정의
const RecommendSection = () => {
  // useQuery 훅을 사용하여 추천 공연팀 데이터를 가져옴
  const { data } = useQuery([QueryKeys.getRecommend], getRecommend);
  // 사용자가 입력한 공연팀 ID 문자열을 상태로 관리
  const [idString, setIdString] = useState<string>("");

  // useMutation 훅을 사용하여 공연팀 추천 데이터 생성 및 수정
  const createRecommend = useMutation(postRecommend);
  const updateRecommend = useMutation(putRecommend);

  // useQueryClient 훅을 사용하여 쿼리 인스턴스를 가져옴
  const queryClient = useQueryClient();

  // 공연팀 추천 수정 또는 생성 처리 함수
  const handleRecommendSubmit = () => {
    // 사용자가 입력한 공연팀 ID 문자열을 콤마(,)로 분리하여 배열로 만듦
    const idList = idString.split(",").map((id) => id.trim());

    // 입력된 공연팀 ID가 6개가 아닌 경우 경고 토스트 출력 후 함수 종료
    if (idList.length !== 8) {
      toast.warn("추천할 공연팀 ID를 6개 입력해주세요");
      return;
    }

    // 현재 데이터가 존재하는지 확인하여 수정 또는 생성 처리
    if (data) {
      // useMutation의 mutate 함수를 사용하여 데이터 수정
      updateRecommend.mutate(
        {
          recommend: {
            id1: idList[0],
            id2: idList[1],
            id3: idList[2],
            id4: idList[3],
            id5: idList[4],
            id6: idList[5],
            id7: idList[6],
            id8: idList[7],
          },
        },
        {
          onSuccess: () => {
            // 쿼리 인스턴스를 통해 해당 쿼리의 데이터를 다시 불러옴
            queryClient.invalidateQueries([QueryKeys.getRecommend]);
            // 입력 상태 초기화 및 성공 토스트 출력
            setIdString("");
            toast.success("추천 공연팀이 수정되었습니다");
          },
          onError: () => {
            // 에러 토스트 출력
            toast.error("추천 공연팀 수정에 실패했습니다");
          },
        },
      );
    } else {
      // 데이터가 없는 경우 useMutation의 mutate 함수를 사용하여 데이터 생성
      createRecommend.mutate(
        {
          recommend: {
            id1: idList[0],
            id2: idList[1],
            id3: idList[2],
            id4: idList[3],
            id5: idList[4],
            id6: idList[5],
            id7: idList[6],
            id8: idList[7],
          },
        },
        {
          onSuccess: () => {
            // 쿼리 인스턴스를 통해 해당 쿼리의 데이터를 다시 불러옴
            queryClient.invalidateQueries([QueryKeys.getRecommend]);
            // 입력 상태 초기화 및 성공 토스트 출력
            setIdString("");
            toast.success("추천 공연팀이 수정되었습니다");
          },
          onError: () => {
            // 에러 토스트 출력
            toast.error("추천 공연팀 수정에 실패했습니다");
          },
        },
      );
    }
  };

  // 모바일 환경 여부 확인
  const isMobile = useIsMobile();

  // JSX 반환
  return (
    <Area>
      <Content>
        {/* 추천 공연팀 섹션 헤더 */}
        <Flex
          justifyContent={"center"}
          style={{
            position: "relative",
          }}
        >
          <Text size={isMobile ? "1.5rem" : "1.875rem"}>
            <Highlight
              color={colorSet.primary}
              style={{
                fontFamily: Fonts.Bold,
              }}
            >
              인기
            </Highlight>{" "}
            <Highlight
              color={colorSet.text}
              style={{
                fontFamily: Fonts.Bold,
              }}
            >
              공연팀
            </Highlight>
          </Text>

          {/* 더보기 링크 */}
          <WrapperLink
            to={Paths.Teams}
            style={{
              position: "absolute",
              right: "0",
              bottom: "0",
            }}
          >
            <Text color={colorSet.primary}>+ 더보기</Text>
          </WrapperLink>
        </Flex>

        {/* 로그인한 사용자에게만 표시되는 공연팀 ID 입력 폼과 수정 버튼 */}
        {isLoggedIn() && (
          <Flex gap={"10px"} alignItems={"center"}>
            {/* 공연팀 ID 입력 폼 */}
            <Input
              width={"60%"}
              value={idString}
              onChange={(e) => {
                setIdString(e.target.value);
              }}
              placeholder={
                "추천할 공연팀 ID 6개를 콤마(,)로 구분하여 입력해주세요"
              }
              style={{
                border: `1px solid ${colorSet.lineGray}`,
                borderRadius: "10px",
                padding: "8px 10px",
              }}
            />

            {/* 수정 버튼 */}
            <Button
              backgroundColor={colorSet.primary}
              onClick={handleRecommendSubmit}
              style={{
                padding: "5px 10px",
                borderRadius: "3px",
              }}
            >
              <Text>수정하기</Text>
            </Button>

            {/* 안내 메시지 */}
            <Text>공연팀 ID는 공연팀 상세페이지 주소 뒤에 있는 숫자입니다</Text>
          </Flex>
        )}

        {/* 섹션 간 간격 */}
        <Spacer height={"30px"} />

        {/* 추천 공연팀 목록 그리드 */}
        {data && (
          <Grid
            // 그리드의 열을 3개로 구성합니다.
            gridTemplateColumns={"1fr 1fr 1fr 1fr"}
            // 모바일 환경과 일반 환경에 따라 그리드 아이템 사이의 간격을 동적으로 조절합니다.
            gap={isMobile ? "10px" : "20px"}
          >
            {/* 각 추천 공연팀에 대한 정보가 있을 경우에만 해당 공연팀을 렌더링합니다. */}
            {data.id1 && <RecommendItem teamId={Number(data.id1)} />}
            {data.id2 && <RecommendItem teamId={Number(data.id2)} />}
            {data.id3 && <RecommendItem teamId={Number(data.id3)} />}
            {data.id4 && <RecommendItem teamId={Number(data.id4)} />}
            {data.id5 && <RecommendItem teamId={Number(data.id5)} />}
            {data.id6 && <RecommendItem teamId={Number(data.id6)} />}
            {data.id7 && <RecommendItem teamId={Number(data.id7)} />}
            {data.id8 && <RecommendItem teamId={Number(data.id8)} />}
          </Grid>
        )}
      </Content>
    </Area>
  );
};

// RecommendSection 컴포넌트를 내보냅니다.
export default RecommendSection;
