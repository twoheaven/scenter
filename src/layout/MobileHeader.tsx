// 필요한 컴포넌트 및 라이브러리를 불러옵니다.
import { Area, Content, Divider, Flex, Text } from "@dohyun-ko/react-atoms";
import WrapperLink from "src/components/wrapperLink/WrapperLink";
import Paths from "src/types/paths";

import facebookLogo from "@/assets/facebook-logo.svg";
import instagramLogo from "@/assets/instagram-logo.svg";
// 로고 이미지를 불러옵니다.
import Logo from "@/assets/logo.png";
import naverBlogLogo from "@/assets/naver-blog-logo.png";
import youtubeLogo from "@/assets/youtube-logo.svg";
// 모바일 화면 여부를 확인하는 훅을 불러옵니다.
import useIsMobile from "@/hooks/useIsMobile";
import Fonts from "@/styles/fonts";

// 모바일 헤더 컴포넌트를 정의합니다.
const MobileHeader = () => {
  // 모바일 여부를 확인하는 훅을 사용합니다.
  const isMobile = useIsMobile();

  // 모바일 헤더 컴포넌트의 렌더링을 수행합니다.
  return (
    <Area>
      <Content>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          style={{
            padding: "10px 0",
          }}
        >
          {/* 로고를 WrapperLink 컴포넌트로 감싸서 메인 페이지로 이동할 수 있도록 합니다. */}
          <Flex gap={"10px"} alignItems={"center"}>
            <WrapperLink to={Paths.Main}>
              <img src={Logo} alt={"logo"} width={isMobile ? "30px" : "54px"} />
            </WrapperLink>
          </Flex>

          {/* 메뉴 항목들을 WrapperLink 컴포넌트로 감싸서 각 페이지로 이동할 수 있도록 합니다. */}
          {/* <Flex gap={"10px"} justifyContent={"flex-start"}>
            <WrapperLink to={Paths.Teams}>
              <Text size={"0.875rem"}>공연팀</Text>
            </WrapperLink>

            <WrapperLink to={Paths.Celebrities}>
              <Text size={"0.875rem"}>연예인</Text>
            </WrapperLink>

            <WrapperLink to={Paths.Event}>
              <Text size={"0.875rem"}>행사</Text>
            </WrapperLink>

            <WrapperLink to={Paths.Party}>
              <Text size={"0.875rem"}>파티</Text>
            </WrapperLink>

            <WrapperLink to={Paths.Study}>
              <Text size={"0.875rem"}>교육</Text>
            </WrapperLink>

            <WrapperLink to={Paths.Systems}>
              <Text size={"0.875rem"}>시스템</Text>
            </WrapperLink>
          </Flex> */}
          <Flex alignItems={"center"} gap={"10px"}>
            <Text
              color={"black"}
              style={{
                fontFamily: Fonts.Bold,
              }}
              size={"15px"}
            >
              문의 : 0505-510-0202
            </Text>
            {/* 소셜 링크 모음 */}
            <Flex gap={"10px"} alignItems={"center"}>
              {/* YouTube 링크를 위한 WrapperLink */}
              <WrapperLink to={"https://www.youtube.com"}>
                <img
                  src={youtubeLogo}
                  alt="유튜브"
                  style={{
                    width: "28px",
                  }}
                />
              </WrapperLink>

              {/* Facebook 링크를 위한 WrapperLink */}
              <WrapperLink to={"https://www.facebook.com"}>
                <img
                  src={facebookLogo}
                  alt="페이스북"
                  style={{
                    width: "24px",
                  }}
                />
              </WrapperLink>

              {/* Instagram 링크를 위한 WrapperLink */}
              <WrapperLink to={"https://instagram.com"}>
                <img
                  src={instagramLogo}
                  alt="인스타그램"
                  style={{
                    width: "24px",
                  }}
                />
              </WrapperLink>

              {/* Naver 블로그 링크를 위한 WrapperLink */}
              <WrapperLink to={"https://blog.naver.com"}>
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

      {/* 구분선을 추가합니다. */}
      <Divider />
    </Area>
  );
};

// MobileHeader 컴포넌트를 내보냅니다.
export default MobileHeader;
