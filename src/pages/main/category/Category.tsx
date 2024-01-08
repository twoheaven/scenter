import { Area, Button, Content, Flex, Text } from "@dohyun-ko/react-atoms";
import { useHover } from "@mantine/hooks";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import WrapperLink from "src/components/wrapperLink/WrapperLink";
import colorSet from "src/styles/color-set";
import Paths from "src/types/paths";

import useIsMobile from "@/hooks/useIsMobile";

// Category 컴포넌트의 프로퍼티 정의
interface CategoryProps {}

const categories = ["공연팀", "연예인", "행사", "파티", "교육", "시스템"];
const categoryPaths = [
  Paths.Teams,
  Paths.Celebrities,
  Paths.Event,
  Paths.Party,
  Paths.Study,
  Paths.Systems,
];

// Category 컴포넌트 정의
const Category = ({}: CategoryProps) => {
  // 모바일 환경 여부를 확인하는 커스텀 훅 사용
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = useNavigate();
  // JSX 반환
  return (
    <Area>
      <Content>
        {/* 카테고리 버튼들을 포함한 Flex 컴포넌트 */}
        <Flex gap={isMobile ? "38px" : "90px"} justifyContent={"center"}>
          {categories.map((category, index) => (
            <Link to={categoryPaths[index]} key={index}>
              {" "}
              {/* Link를 사용하여 페이지로 이동합니다. */}
              <Button
                key={index}
                onMouseOver={() => setActiveIndex(index)}
                onMouseOut={() => setActiveIndex(-1)}
                backgroundColor={
                  activeIndex === index ? colorSet.primary : "transparent"
                }
                borderRadius={"5px"}
                style={{
                  padding: "0 10px",
                }}
              >
                <Text
                  size={isMobile ? "0.75rem" : "1.5rem"}
                  color={activeIndex === index ? "white" : colorSet.textLight}
                >
                  {category}
                </Text>
              </Button>
            </Link>
          ))}

          {/* 각 카테고리에 대한 CategoryButton 컴포넌트를 렌더링 */}
          {/*
          <CategoryButton
            icon={
              <Icons.Team
                size={isMobile ? "30px" : "50px"}
                color={colorSet.textLight}
              />
            }
            text={"공연팀"}
            to={Paths.Teams}
          />

          <CategoryButton
            icon={
              <Icons.Star
                size={isMobile ? "30px" : "50px"}
                color={colorSet.textLight}
              />
            }
            text={"연예인"}
            to={Paths.Celebrities}
          />

          <CategoryButton
            icon={
              <Icons.Event
                size={isMobile ? "30px" : "50px"}
                color={colorSet.textLight}
              />
            }
            text={"행사"}
            to={Paths.Event}
          />

          <CategoryButton
            icon={
              <Icons.Party
                size={isMobile ? "30px" : "50px"}
                color={colorSet.textLight}
              />
            }
            text={"파티"}
            to={Paths.Party}
          />

          <CategoryButton
            icon={
              <Icons.Study
                size={isMobile ? "30px" : "50px"}
                color={colorSet.textLight}
              />
            }
            text={"교육"}
            to={Paths.Study}
          />

          <CategoryButton
            icon={
              <Icons.Speaker
                size={isMobile ? "30px" : "50px"}
                color={colorSet.textLight}
              />
            }
            text={"시스템"}
            to={Paths.Systems}
          />
          */}
        </Flex>
      </Content>
    </Area>
  );
};

// CategoryButton 컴포넌트의 프로퍼티 정의
interface CategoryButtonProps {
  icon: React.ReactNode;
  text: string;
  to: string;
}

// CategoryButton 컴포넌트 정의
const CategoryButton = ({ icon, text, to }: CategoryButtonProps) => {
  // useHover 훅을 사용하여 마우스 호버 상태 관리
  const { hovered, ref } = useHover<HTMLAnchorElement>();

  // JSX 반환
  return (
    <WrapperLink to={to} ref={ref}>
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"67px"}
        gap={"10px"}
      >
        {/* 카테고리 아이콘
        {icon} */}
        {/* 카테고리 텍스트 */}
        <Text
          size={"1rem"}
          color={hovered ? colorSet.primary : colorSet.textLight}
        >
          {text}
        </Text>
      </Flex>
    </WrapperLink>
  );
};

// Category 컴포넌트를 내보냅니다.
export default Category;
