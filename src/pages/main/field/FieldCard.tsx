import { Button, Divider, Flex, Spacer, Text } from "@dohyun-ko/react-atoms";
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
    width: ${isMobile ? "155px" : "250px"};
  `;

  const StyledButton = styled.button`
    padding: "3px 3px";
    border: 0.1px solid #999999;
    border-radius: 2px;
    background-color: white;
    width: ${isMobile ? "165px" : "260px"};
  `;

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
          width={isMobile ? "165px" : "260px"}
          src={field?.storedFilePath || defaultImage}
          alt={field?.originalFileName}
        />
      </Flex>
      <Spacer height={"1px"} />
      <StyledButton>
        <Flex justifyContent="flex-start">
          <Wrapper>
            <Spacer height={"5px"} />
            <Text size="20px">
              {title}dddddddddddddddddddd
              <Distance />
              <Distance />
            </Text>
            <Spacer height={"5px"} />

            <Text>
              {date}d
              <Distance />
              <Distance />
            </Text>

            <Spacer height={"2px"} />

            <Text>
              출연진 : {location}
              <Distance />
              <Distance />
            </Text>

            <Spacer height={"2px"} />

            <Text>
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
