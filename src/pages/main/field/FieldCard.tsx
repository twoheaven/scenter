import { Flex, Spacer, Text } from "@dohyun-ko/react-atoms";
import { useEffect, useState } from "react";
import styled from "styled-components";

import defaultImage from "@/assets/default-image.svg";
import useIsMobile from "@/hooks/useIsMobile";
import { Field } from "@/types/interfaces";

interface FieldCardProps {
  field?: Field;
}

const Distance = () => {
  return <div style={{ width: "10px" }} />;
};

const FieldCard = ({ field }: FieldCardProps) => {
  const isMobile = useIsMobile();

  const Wrapper = styled.div`
    white-space: pre-line;
    word-wrap: break-word;
  `;

  const StyledButton = styled.button`
    padding: "3px 3px";
    border: 0.1px solid #999999;
    border-radius: 2px;
    background-color: white;
  `;

  const [imageWidth, setImageWidth] = useState(
    isMobile ? window.innerWidth / 2.3 : window.innerWidth / 5,
  ); // 이미지의 너비를 브라우저 창의 60%로 설정합니다.

  useEffect(() => {
    const handleResize = () => {
      setImageWidth(isMobile ? window.innerWidth / 2.3 : window.innerWidth / 5); // 윈도우 크기에 따라 이미지의 너비를 업데이트합니다.
    };

    window.addEventListener("resize", handleResize); // resize 이벤트에 대한 이벤트 리스너를 추가합니다.

    return () => {
      window.removeEventListener("resize", handleResize); // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    };
  }, [isMobile]); // useEffect의 두 번째 인자로 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 useEffect가 실행되도록 설정합니다.

  const { title, date, location, casting } = field || {};

  return (
    <Flex justifyContent="center">
      <Flex
        justifyContent="center"
        style={{
          aspectRatio: "1/1",
        }}
      >
        <img
          width={imageWidth}
          src={field?.storedFilePath || defaultImage}
          alt={field?.originalFileName}
        />
      </Flex>
      <Spacer height={"1px"} />
      <StyledButton style={{ width: `${imageWidth}px` }}>
        <Flex justifyContent="flex-start">
          <Wrapper>
            <Spacer height={"5px"} />
            <Text size="20px" style={{ textAlign: "left" }}>
              {title}ddddddddd
              <Distance />
              <Distance />
            </Text>
            <Spacer height={"5px"} />

            <Text style={{ textAlign: "left" }}>
              {date}d
              <Distance />
              <Distance />
            </Text>

            <Spacer height={"2px"} />

            <Text style={{ textAlign: "left" }}>
              출연진 : {location}
              <Distance />
              <Distance />
            </Text>

            <Spacer height={"2px"} />

            <Text style={{ textAlign: "left" }}>
              {casting}d
              <Distance />
              <Distance />
            </Text>
            <Spacer height={"5px"} />
          </Wrapper>
        </Flex>
      </StyledButton>
    </Flex>
  );
};
export default FieldCard;
