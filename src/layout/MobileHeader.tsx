// 필요한 컴포넌트 및 라이브러리를 불러옵니다.
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

// 로고 이미지를 불러옵니다.
import Logo from "@/assets/logo.png";
// 모바일 화면 여부를 확인하는 훅을 불러옵니다.
import useIsMobile from "@/hooks/useIsMobile";

// 모바일 헤더 컴포넌트를 정의합니다.
const MobileHeader = () => {
  // 모바일 여부를 확인하는 훅을 사용합니다.
  const isMobile = useIsMobile();

  // React Router의 useNavigate 훅을 사용하여 페이지 이동을 처리합니다.
  const navigate = useNavigate();

  // 검색 폼 제출 이벤트 핸들러를 정의합니다.
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 검색어 입력란을 가져옵니다.
    const searchQuery = e.currentTarget.searchQuery as HTMLInputElement;

    // 검색어가 없는 경우 경고 메시지를 토스트로 표시하고 함수를 종료합니다.
    if (!searchQuery.value) {
      toast.warn("검색어를 입력해주세요");
      return;
    }

    // 검색 결과 페이지로 이동합니다.
    navigate(Paths.Search + "?keyword=" + searchQuery.value);
  };

  // 모바일 헤더 컴포넌트의 렌더링을 수행합니다.
  return (
    <Area>
      <Content>
        <Spacer height={"2px"} />
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
          <Flex gap={"10px"} justifyContent={"flex-start"}>
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
          </Flex>

          {/* 여백을 주어 간격을 조절합니다. */}
          <Flex gap={"50px"}>
            <Text>　</Text>
            <Text>　</Text>
            <Text>　</Text>
          </Flex>

          {/* 검색 폼을 렌더링합니다. */}
          <form onSubmit={handleFormSubmit}>
            <Flex alignItems={"center"}>
              <Input
                width={"120px"}
                name={"searchQuery"}
                placeholder={"검색어를 입력하세요"}
                style={{
                  border: "none",
                  fontSize: "14px",
                }}
              />
              <Button>
                <Icons.Search size={"18px"} color={colorSet.textLight} />
              </Button>
            </Flex>
          </form>
        </Flex>
      </Content>

      {/* 구분선을 추가합니다. */}
      <Divider />
    </Area>
  );
};

// MobileHeader 컴포넌트를 내보냅니다.
export default MobileHeader;
