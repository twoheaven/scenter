// 필요한 컴포넌트 및 라이브러리 가져오기
import {
  Area,
  Content,
  Divider,
  Flex,
  Spacer,
  Text,
} from "@dohyun-ko/react-atoms";
import WrapperLink from "src/components/wrapperLink/WrapperLink";
import Paths from "src/types/paths";
import styled from "styled-components";

// 로고 이미지 가져오기
import useIsMobile from "@/hooks/useIsMobile";
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

// WrapperLink에 스타일 추가
const StyledWrapperLink = styled(WrapperLink)`
  flex: 1; /* 각 WrapperLink가 동일한 너비를 가질 수 있도록 설정 */
  text-align: center; /* 텍스트 가운데 정렬 */
`;

// Header를 나타내는 함수형 컴포넌트
const Header2 = () => {
  // 모바일 환경 여부를 확인하는 커스텀 훅 사용
  const isMobile = useIsMobile();

  return (
    // Header 영역
    <Area>
      <Content>
        {/* 두번째 층 시작 */}
        <Spacer height={"5px"} />
        {/* Flex 컨테이너 - 공간을 벌려주고, 아이템을 가운데 정렬 */}
        <Container>
          {/* 각종 메뉴에 대한 링크 */}
          <StyledWrapperLink to={Paths.Teams}>
            <Text>공연팀</Text>
          </StyledWrapperLink>

          <Text style={{ color: "#999999" }}>|</Text>
          <StyledWrapperLink to={Paths.Celebrities}>
            <Text>연예인</Text>
          </StyledWrapperLink>
          <Text style={{ color: "#999999" }}>|</Text>
          <StyledWrapperLink to={Paths.Event}>
            <Text>행사</Text>
          </StyledWrapperLink>
          <Text style={{ color: "#999999" }}>|</Text>
          <StyledWrapperLink to={Paths.Party}>
            <Text>파티</Text>
          </StyledWrapperLink>
          <Text style={{ color: "#999999" }}>|</Text>
          <StyledWrapperLink to={Paths.Study}>
            <Text>교육</Text>
          </StyledWrapperLink>
          <Text style={{ color: "#999999" }}>|</Text>
          <StyledWrapperLink to={Paths.Systems}>
            <Text>시스템</Text>
          </StyledWrapperLink>
          <Text style={{ color: "#999999" }}>|</Text>
          {/* 카카오톡 채팅 링크 버튼 */}
          <WrapperLink
            to={"https://pf.kakao.com/_cVkMG/chat"}
            style={{ marginLeft: "auto" }}
          >
            <Flex
              gap={"3px"}
              alignItems={"center"}
              height={"100%"}
              style={{
                backgroundColor: "#FFE812",
                borderRadius: "40px",
                padding: isMobile ? "0 8px" : "0 11px",
              }}
            >
              <img src={kakaoLogo} width={isMobile ? "16px" : "30px"} />

              <Text
                size={isMobile ? "6px" : "16px"}
                color={"black"}
                font={Fonts.Medium}
              >
                상담톡 바로가기
              </Text>
            </Flex>
          </WrapperLink>
        </Container>
        <Spacer height={"5px"} />
      </Content>

      {/* 가로선 구분자 */}
      <Divider />
    </Area>
  );
};

// Header 컴포넌트 내보내기
export default Header2;
