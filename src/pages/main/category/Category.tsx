import { Area, Button, Content, Flex, Text } from "@dohyun-ko/react-atoms";
import { useState } from "react";
import { Link } from "react-router-dom";
import colorSet from "src/styles/color-set";
import Paths from "src/types/paths";
import styled from "styled-components";

import useIsMobile from "@/hooks/useIsMobile";

// Flex 컨테이너 스타일을 직접 지정
const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%; /* 전체 너비 사용 */
`;

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
  // JSX 반환
  return (
    <Area>
      <Content>
        {/* 카테고리 버튼들을 포함한 Flex 컴포넌트 */}
        <Flex justifyContent="center">
        <StyledFlexContainer>
          {categories.map((category, index) => (
            <Link to={categoryPaths[index]} key={index}>
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
                  size={isMobile ? "0.8rem" : "1.5rem"}
                  color={activeIndex === index ? "white" : "black"}
                >
                  {category}
                </Text>
              </Button>
            </Link>
          ))}
        </StyledFlexContainer>
        </Flex>
      </Content>
    </Area>
  );
};

// Category 컴포넌트를 내보냅니다.
export default Category;
