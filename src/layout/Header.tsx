// 필요한 컴포넌트 및 라이브러리 가져오기
import {
  Area,
  Button,
  Content,
  Divider,
  Flex,
  Input,
  Spacer,
  Text,
} from "@dohyun-ko/react-atoms";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Icons from "src/assets/Icons";
import WrapperLink from "src/components/wrapperLink/WrapperLink";
import colorSet from "src/styles/color-set";
import Paths from "src/types/paths";

import facebookLogo from "@/assets/facebook-logo.svg";
import instagramLogo from "@/assets/instagram-logo.png";
// 로고 이미지 가져오기
import Logo from "@/assets/logo.png";
import naverBlogLogo from "@/assets/naver-blog-logo.png";
import youtubeLogo from "@/assets/youtube-logo.png";
import useIsMobile from "@/hooks/useIsMobile";
import Fonts from "@/styles/fonts";
import { isLoggedIn } from "@/utils/utils";

import kakaoLogo from "../assets/kakao-logo.svg";

// Header 컴포넌트의 프로퍼티를 정의하는 인터페이스
interface HeaderProps {}

// Header를 나타내는 함수형 컴포넌트
const Header = ({}: HeaderProps) => {
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
          <Flex gap={"30px"}>
            <Text></Text>
            <Text>　</Text>
            <Text>　</Text>
            <Text>　</Text>
            <Text>　</Text>
            <Text>　</Text>
            <Text>　</Text>
            <Text>　</Text>
            <Text>　</Text>
            <Text>　</Text>
          </Flex>
          {/* 오른쪽 섹션 - 검색 폼 및 문의 전화번호 */}
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            gap={"10px"}
          >
            {/* 검색 폼 */}
            <form onSubmit={handleFormSubmit}>
              <Flex alignItems={"center"}>
                <Input
                  width={"140px"}
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

            {/* 문의 전화번호 */}
            <Text color={colorSet.textGray}>문의 : 0505-510-0202</Text>
          </Flex>
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
      </Content>

      {/* 가로선 구분자 */}
      <Divider />
    </Area>
  );
};

// Header 컴포넌트 내보내기
export default Header;
