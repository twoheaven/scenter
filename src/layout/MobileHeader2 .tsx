// 필요한 컴포넌트 및 라이브러리 가져오기
import {
  Area,
  Button,
  Divider,
  Flex,
  Input,
  Spacer,
  Text,
} from "@dohyun-ko/react-atoms";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import WrapperLink from "src/components/wrapperLink/WrapperLink";
import Paths from "src/types/paths";
import styled from "styled-components";

import Icons from "@/assets/Icons";
import Logo from "@/assets/logo.png";
// 로고 이미지 가져오기
import useIsMobile from "@/hooks/useIsMobile";
import colorSet from "@/styles/color-set";
import Fonts from "@/styles/fonts";

import kakaoLogo from "../assets/kakao-logo.svg";

const Container = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px; /* Set maximum width to 1200px */
  width: 100%; /* Ensure it takes the full width within the maximum */
  margin: 0 auto; /* Center the container horizontally */
`;

const StyledButton = styled(Button)`
  background-color: #fff;
  color: #fff;
  border: 2px solid #007bff;
  padding: 2px 10px;
  cursor: pointer;
  border-radius: 20px;
  widows: auto;
`;

// Header를 나타내는 함수형 컴포넌트
const MobileHeader2 = () => {
  // 모바일 환경 여부를 확인하는 커스텀 훅 사용
  const isMobile = useIsMobile();
  // React Router의 navigate 훅 사용
  const navigate = useNavigate();

  // 검색 폼 제출 처리 함수
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 검색어 입력란 가져오기
    const searchQuery = e.currentTarget.searchQuery as HTMLInputElement;

    // 검색어가 없으면 경고 메시지 표시
    if (!searchQuery.value) {
      toast.warn("검색어를 입력해주세요");
      return;
    }

    // 검색 결과 페이지로 이동
    navigate(Paths.Search + "?keyword=" + searchQuery.value);
  };

  return (
    // Header 영역
    <Area>
      {/* 두번째 층 시작 */}
      <Spacer height={"5px"} />
      {/* Flex 컨테이너 - 공간을 벌려주고, 아이템을 가운데 정렬 */}
      <Container>
        {/* 검색 폼 */}
        <Flex
          alignItems="center"
          justifyContent="flex-end"
          style={isMobile ? { width: "70%" } : { width: "50%" }}
        >
          <StyledButton width={"95%"} height="41px">
            <form onSubmit={handleFormSubmit}>
              <Flex alignItems="center" justifyContent="space-between">
                <img src={Logo} height={"20px"} />
                <Input
                  width={"65%"}
                  name={"searchQuery"}
                  placeholder={"검색어를 입력하세요"}
                  style={{
                    border: "none",
                  }}
                />
                <Button>
                  <Icons.Search size={"24px"} color={colorSet.textLight} />
                </Button>
              </Flex>
            </form>
          </StyledButton>
        </Flex>
        {/* 카카오톡 채팅 링크 버튼 */}
        <Flex justifyContent="start" style={{ width: "27%" }}>
          <WrapperLink
            to={"http://pf.kakao.com/_LWxkSC"}
            style={{ marginLeft: "0px" }}
          >
            <Flex
              gap={"3px"}
              alignItems={"center"}
              height={isMobile ? "34px" : "100%"}
              style={{
                backgroundColor: "#FFE812",
                borderRadius: "40px",
                padding: isMobile ? "0 4px" : "0 11px",
              }}
            >
              <img src={kakaoLogo} width={isMobile ? "18px" : "30px"} />

              <Text
                size={isMobile ? "11px" : "16px"}
                color={"black"}
                font={Fonts.Medium}
              >
                상담톡 바로가기
              </Text>
            </Flex>
          </WrapperLink>
        </Flex>
      </Container>
      <Spacer height={"5px"} />
      {/* 가로선 구분자 */}
      <Divider />
    </Area>
  );
};

// Header 컴포넌트 내보내기
export default MobileHeader2;
