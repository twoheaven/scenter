import {
  Area,
  Button,
  Content,
  Flex,
  Grid,
  Input,
  Spacer,
  Text,
  TextArea,
} from "@dohyun-ko/react-atoms"; // 라이브러리에서 필요한 컴포넌트를 가져옵니다.
import { useMutation, useQuery } from "@tanstack/react-query"; // 변이와 쿼리를 위한 훅을 가져옵니다.
import { useEffect, useState } from "react"; // 컴포넌트 상태 및 부수 효과 관리를 위한 리액트 훅을 가져옵니다.
import { useNavigate, useSearchParams } from "react-router-dom"; // 프로그래밍 방식의 네비게이션과 URL 검색 매개변수 액세스를 위한 훅을 가져옵니다.
import { toast } from "react-toastify"; // 토스트 알림을 표시하기 위한 라이브러리를 가져옵니다.
import Swal from "sweetalert2"; // 사용자 정의 경고를 표시하기 위한 라이브러리를 가져옵니다.

import { getText, postText, putText } from "@/apis/text-api"; // API 요청을 수행하기 위한 함수들을 가져옵니다.
import {
  CelebrityTabs,
  DanceTabs,
  MCTabs,
  PartyTabs,
  PerformanceTabs,
  PlayTabs,
  SingTabs,
} from "@/store"; // 스토어에서 탭 데이터를 가져옵니다.
import colorSet from "@/styles/color-set"; // 색상 설정을 가져옵니다.
import Fonts from "@/styles/fonts"; // 폰트 스타일을 가져옵니다.
import { Division } from "@/types/interfaces"; // 인터페이스 및 타입을 가져옵니다.
import Paths from "@/types/paths"; // 경로를 가져옵니다.
import QueryKeys from "@/types/queryKeys"; // 쿼리 키를 가져옵니다.

// ContentCreate 컴포넌트를 정의합니다.
const ContentCreate = () => {
  // 상태 및 URL 검색 매개변수 가져오기에 필요한 훅을 사용합니다.
  const [searchParams] = useSearchParams();
  const { data } = useQuery(
    [
      // 쿼리 매개변수 정의
      QueryKeys.getText,
      {
        id: Number(searchParams.get("teamId")), // URL 검색 매개변수에서 팀 ID 가져오기
      },
    ],
    getText, // 텍스트 데이터를 가져오는 함수
    {
      enabled: !!Number(searchParams.get("teamId")), // 팀 ID가 존재하는 경우에만 쿼리 활성화
      refetchInterval: false, // 자동 새로고침 비활성화
      refetchOnMount: false, // 컴포넌트 마운트 시 새로고침 비활성화
      refetchOnWindowFocus: false, // 창 포커스 시 새로고침 비활성화
      refetchOnReconnect: false, // 재연결 시 새로고침 비활성화
      refetchIntervalInBackground: false, // 백그라운드에서 새로고침 비활성화
    },
  );

  // 상태 변수 초기화
  const [divison, setDivision] = useState<Division>();
  const [name, setName] = useState("");
  const [shortIntro, setShortIntro] = useState("");
  const [teamMany, setTeamMany] = useState<number>(0);
  const [longIntro, setLongIntro] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [repertoire, setRepertoire] = useState("");
  const [equipment, setEquipment] = useState("");

  // 데이터 가져오기 후 상태 업데이트를 위한 useEffect 훅
  useEffect(() => {
    if (data) {
      setDivision(data.division as Division); // 분류 설정
      setName(data.teamName); // 팀명 설정
      setShortIntro(data.shortIntro); // 간단 소개 설정
      setTeamMany(data.teamMany); // 팀원 수 설정
      setLongIntro(data.longIntro); // 자세한 소개 설정
      setPortfolio(data.portfolio); // 포트폴리오 설정
      setRepertoire(data.repertoire); // 레파토리 설정
      setEquipment(data.equipment); // 장비 설정
    }
  }, [data]); // 데이터가 변경될 때 효과 실행

  // 내용 생성 및 업데이트를 위한 변이 함수 정의
  const createContent = useMutation(postText);
  const updateContent = useMutation(putText);

  // 프로그래밍 방식으로 이동하기 위한 navigate 훅
  const navigate = useNavigate();

  // 양식 제출을 처리하는 함수
  const handleSubmit = async () => {
    // 양식 필드 유효성 검사
    if (!divison) {
      toast.warn("분류를 선택해주세요");
      return;
    }
    if (!name) {
      toast.warn("팀명을 입력해주세요");
      return;
    }

    // 콘텐츠 객체 구성
    const content = {
      division: divison,
      teamName: name,
      shortIntro: shortIntro || " ",
      teamMany: teamMany || 0,
      longIntro: longIntro || " ",
      portfolio: portfolio || " ",
      repertoire: repertoire || " ",
      equipment: equipment || " ",
    };

    // 로딩 알림 표시
    Swal.fire({
      text: "콘텐츠 생성 중입니다",
      icon: "info",
      showConfirmButton: false,
    });

    // URL 매개변수에 teamId가 있는 경우 create 또는 update 변이 실행
    if (searchParams.get("teamId")) {
      updateContent.mutate(
        {
          id: Number(searchParams.get("teamId")),
          ...content,
        },
        {
          onSuccess: (data) => {
            navigate(Paths.TeamDetail + data.id); // 팀 세부 정보 페이지로 이동
            Swal.fire({
              text: "콘텐츠가 수정되었습니다",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
          },
          onError: () => {
            Swal.fire({
              text: "콘텐츠 수정에 실패했습니다",
              icon: "error",
              showConfirmButton: false,
              timer: 1500,
            });
          },
        },
      );
    } else {
      createContent.mutate(content, {
        onSuccess: (data) => {
          navigate(Paths.TeamDetail + data.id); // 팀 세부 정보 페이지로 이동
          Swal.fire({
            text: "콘텐츠가 생성되었습니다",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        },
        onError: () => {
          Swal.fire({
            text: "콘텐츠 생성에 실패했습니다",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
    }
  };

  return (
    // UI 컴포넌트 렌더링
    <Area>
      <Spacer height={"50px"} />
      <Content>
        <Flex justifyContent={"center"}>
          <Text font={Fonts.Medium} size={"28px"}>
            콘텐츠 {searchParams.get("teamId") ? "수정" : "생성"}
          </Text>
        </Flex>
        {/* 양식 필드 */}
        <Spacer height={"30px"} />
        <Flex
          flexDirection={"column"}
          style={{
            border: `1px solid ${colorSet.lineGray}`,
            padding: "20px",
          }}
        >
          <Grid gridTemplateColumns={"100px 1fr"} gap={"16px 20px"}>
            {/* 분류 필드 */}
            <Text
              color={colorSet.textWhite}
              font={Fonts.Medium}
              textAlign={"center"}
              style={{
                padding: "6px 10px",
                backgroundColor: colorSet.primary,
                borderRadius: "3px",
              }}
            >
              분류
            </Text>
            <Flex>
              {/* 분류 선택 드롭다운 */}
              <select
                value={divison}
                onChange={(e) => {
                  setDivision(e.target.value as Division);
                }}
                style={{
                  border: `1px solid ${colorSet.lineGray}`,
                  borderRadius: "10px",
                  padding: "8px 10px",
                }}
              >
                <option value="">--선택해주세요--</option>
                {[
                  ...SingTabs,
                  ...PlayTabs,
                  ...PerformanceTabs,
                  ...DanceTabs,
                  ...MCTabs,
                  ...CelebrityTabs,
                  ...PartyTabs,
                ].map((tab) => (
                  <option value={tab.division} key={tab.division}>
                    {tab.text}
                  </option>
                ))}
              </select>
            </Flex>
            {/* 팀명 필드 */}
            <Text
              color={colorSet.textWhite}
              font={Fonts.Medium}
              textAlign={"center"}
              style={{
                padding: "6px 10px",
                backgroundColor: colorSet.primary,
                borderRadius: "3px",
              }}
            >
              팀명
            </Text>
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder={"팀명을 입력하세요"}
              style={{
                border: `1px solid ${colorSet.lineGray}`,
                borderRadius: "10px",
              }}
            />
            {/* 간단 소개 필드 */}
            <Text
              color={colorSet.textWhite}
              font={Fonts.Medium}
              textAlign={"center"}
              style={{
                padding: "6px 10px",
                backgroundColor: colorSet.primary,
                borderRadius: "3px",
              }}
            >
              간단 소개글
            </Text>
            <Input
              value={shortIntro}
              onChange={(e) => {
                setShortIntro(e.target.value);
              }}
              placeholder={"간단 소개글을 입력하세요"}
              style={{
                border: `1px solid ${colorSet.lineGray}`,
                borderRadius: "10px",
              }}
            />
            {/* 팀원 수 필드 */}
            <Text
              color={colorSet.textWhite}
              font={Fonts.Medium}
              textAlign={"center"}
              style={{
                padding: "6px 10px",
                backgroundColor: colorSet.primary,
                borderRadius: "3px",
              }}
            >
              팀원 수
            </Text>
            <Input
              value={teamMany}
              type={"number"}
              onChange={(e) => {
                setTeamMany(Number(e.target.value) || 0);
              }}
              placeholder={"팀원 수를 입력하세요"}
              style={{
                border: `1px solid ${colorSet.lineGray}`,
                borderRadius: "10px",
              }}
            />
          </Grid>
          {/* 자세한 소개 필드 */}
          <Spacer height={"10px"} />
          <Text font={Fonts.Medium}>소개</Text>
          <Spacer height={"5px"} />
          <TextArea
            value={longIntro}
            onChange={(e) => {
              setLongIntro(e.target.value);
            }}
            placeholder={"소개를 입력하세요"}
            rows={4}
            style={{
              border: `1px solid ${colorSet.lineGray}`,
              borderRadius: "10px",
              padding: "8px 10px",
              resize: "none",
            }}
          />
          {/* 포트폴리오 필드 */}
          <Spacer height={"10px"} />
          <Text font={Fonts.Medium}>포트폴리오</Text>
          <Spacer height={"5px"} />
          <TextArea
            value={portfolio}
            onChange={(e) => {
              setPortfolio(e.target.value);
            }}
            placeholder={"포트폴리오를 입력하세요"}
            rows={10}
            style={{
              border: `1px solid ${colorSet.lineGray}`,
              borderRadius: "10px",
              padding: "8px 10px",
              resize: "none",
            }}
          />
          {/* 레파토리 필드 */}
          <Spacer height={"10px"} />
          <Text font={Fonts.Medium}>레파토리</Text>
          <Spacer height={"5px"} />
          <TextArea
            value={repertoire}
            onChange={(e) => {
              setRepertoire(e.target.value);
            }}
            placeholder={"레파토리를 입력하세요"}
            rows={4}
            style={{
              border: `1px solid ${colorSet.lineGray}`,
              borderRadius: "10px",
              padding: "8px 10px",
              resize: "none",
            }}
          />
          {/* 요청장비 필드 */}
          <Spacer height={"10px"} />
          <Text font={Fonts.Medium}>요청장비</Text>
          <Spacer height={"5px"} />
          <TextArea
            value={equipment}
            onChange={(e) => {
              setEquipment(e.target.value);
            }}
            placeholder={"요청장비를 입력하세요"}
            rows={4}
            style={{
              border: `1px solid ${colorSet.lineGray}`,
              borderRadius: "10px",
              padding: "8px 10px",
              resize: "none",
            }}
          />
          {/* 제출 버튼 */}
          <Spacer height={"20px"} />
          <Flex justifyContent={"end"}>
            <Button
              backgroundColor={colorSet.primary}
              width={"185px"}
              onClick={handleSubmit}
              style={{
                borderRadius: "25px",
                padding: "10px 20px",
              }}
            >
              <Text font={Fonts.Bold} color={colorSet.textWhite}>
                업로드하기
              </Text>
            </Button>
          </Flex>
        </Flex>
        <Spacer height={"20px"} />
      </Content>
    </Area>
  );
};

export default ContentCreate; // ContentCreate 컴포넌트를 내보냅니다.
