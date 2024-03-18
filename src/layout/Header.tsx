// 필요한 컴포넌트 및 라이브러리 가져오기
import {
  Area,
  Button,
  Content,
  Divider,
  Flex,
  Highlight,
  Spacer,
  Text,
} from "@dohyun-ko/react-atoms";
import WrapperLink from "src/components/wrapperLink/WrapperLink";
import colorSet from "src/styles/color-set";
import Paths from "src/types/paths";

import facebookLogo from "@/assets/facebook-logo.svg";
import instagramLogo from "@/assets/instagram-logo.svg";
// 로고 이미지 가져오기
import Logo from "@/assets/logo.png";
import naverBlogLogo from "@/assets/naver-blog-logo.png";
import youtubeLogo from "@/assets/youtube-logo.svg";
import Fonts from "@/styles/fonts";
import { isLoggedIn } from "@/utils/utils";

// Header를 나타내는 함수형 컴포넌트
const Header = () => {
  return (
    // Header 영역
    <Area>
      <Content>
        <Spacer height={"7px"} />
        {/* Flex 컨테이너 - 공간을 벌려주고, 아이템을 가운데 정렬 */}
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          style={{
            padding: "0px 0",
          }}
        >
          {/* 왼쪽 섹션 - 로고, 설명, 메뉴 등 */}
          <Flex gap={"20px"} alignItems={"center"}>
            {/* 메인 페이지로 이동하는 링크 */}
            <WrapperLink to={Paths.Main}>
              <img src={Logo} alt={"logo"} width={"70px"} />
            </WrapperLink>
            {/* 로그인 상태에 따라 콘텐츠 생성 버튼 표시 */}
            {isLoggedIn() && (
              <WrapperLink to={Paths.ContentCreate}>
                <Button
                  backgroundColor={colorSet.primary}
                  style={{
                    padding: "3px 6px",
                    borderRadius: "3px",
                  }}
                >
                  <Text font={Fonts.Medium} size={"0.9375rem"}>
                    콘텐츠 생성
                  </Text>
                </Button>
              </WrapperLink>
            )}
          </Flex>
          {/* 오른쪽 섹션 - 문의 전화번호 & SNS 링크 */}
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            gap={"15px"}
          >
            {/* 문의 전화번호 */}
            <Text color={"black"}>
              <Highlight
                color={"black"}
                style={{
                  fontFamily: Fonts.Bold,
                }}
              >
                문의 : 0505-510-0202
              </Highlight>
            </Text>
            {/* 소셜 링크 모음 */}
            <Flex gap={"10px"} alignItems={"center"}>
              {/* YouTube 링크를 위한 WrapperLink */}
              <WrapperLink
                to={"https://www.youtube.com/channel/UCf4GpFPTt2TtZgu4pyNx0Qg"}
              >
                <img
                  src={youtubeLogo}
                  alt="유튜브"
                  style={{
                    width: "28px",
                  }}
                />
              </WrapperLink>

              {/* Facebook 링크를 위한 WrapperLink */}
              <WrapperLink
                to={"https://www.instagram.com/sc_ent_?igsh=OGQ5ZDc2ODk2ZA=="}
              >
                <img
                  src={facebookLogo}
                  alt="페이스북"
                  style={{
                    width: "24px",
                  }}
                />
              </WrapperLink>

              {/* Instagram 링크를 위한 WrapperLink */}
              <WrapperLink
                to={"https://www.instagram.com/sc_ent_?igsh=OGQ5ZDc2ODk2ZA=="}
              >
                <img
                  src={instagramLogo}
                  alt="인스타그램"
                  style={{
                    width: "24px",
                  }}
                />
              </WrapperLink>

              {/* Naver 블로그 링크를 위한 WrapperLink */}
              <WrapperLink to={"https://m.blog.naver.com/scdata"}>
                <img
                  src={naverBlogLogo}
                  alt="네이버블로그"
                  style={{
                    width: "24px",
                  }}
                />
              </WrapperLink>
            </Flex>
          </Flex>
        </Flex>
      </Content>

      {/* 가로선 구분자 */}
      <Divider />
    </Area>
  );
};

// Header 컴포넌트 내보내기
export default Header;
