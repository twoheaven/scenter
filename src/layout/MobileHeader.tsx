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

import Logo from "@/assets/logo.png";
import useIsMobile from "@/hooks/useIsMobile";

interface HeaderProps {}

const MobileHeader = ({}: HeaderProps) => {
  const isMobile = useIsMobile();

  const navigate = useNavigate();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchQuery = e.currentTarget.searchQuery as HTMLInputElement;

    if (!searchQuery.value) {
      toast.warn("검색어를 입력해주세요");
      return;
    }

    navigate(Paths.Search + "?keyword=" + searchQuery.value);
  };

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
          <Flex gap={"10px"} alignItems={"center"}>
            <WrapperLink to={Paths.Main}>
              <img src={Logo} alt={"logo"} width={isMobile ? "30px" : "54px"} />
            </WrapperLink>
          </Flex>

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

          <Flex gap={"50px"}>
            <Text>　</Text>
            <Text>　</Text>
            <Text>　</Text>
          </Flex>
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

      <Divider />
    </Area>
  );
};

export default MobileHeader;
