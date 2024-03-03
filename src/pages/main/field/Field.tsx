import {
  Area,
  Content,
  Flex,
  Grid,
  Highlight,
  Spacer,
  Text,
} from "@dohyun-ko/react-atoms";
import { useEffect, useState } from "react";

import useIsMobile from "@/hooks/useIsMobile";
import colorSet from "@/styles/color-set";
import Fonts from "@/styles/fonts";

import FieldCard from "./FieldCard";

interface FieldProps {}

interface Field {
  id: number;
  originalFileName: string;
  storedFilePath: string;
  fileSize: number;
  title: string;
  date: string;
  location: string;
  casting: string;
}

const Field = ({}: FieldProps) => {
  const isMobile = useIsMobile();
  const [fields, setFields] = useState<Field[]>([]); // Field 타입의 배열로 초기화

  useEffect(() => {
    // API 요청 보내기
    fetch("https://cat-project.xyz/api/fields/get")
      .then((response) => response.json())
      .then((data) => {
        setFields(data);
      })
      .catch((error) => {
        console.error("Error fetching fields:", error);
      });
  }, []);

  console.log("Field received data:", fields);
  return (
    <Area>
      <Content>
        <Flex
          justifyContent={"center"}
          style={{
            position: "relative",
          }}
        >
          <Text size={isMobile ? "1.5rem" : "1.875rem"}>
            <Highlight color={colorSet.primary}>현장</Highlight>{" "}
            <Highlight
              color={colorSet.text}
              style={{
                fontFamily: Fonts.Bold,
              }}
            >
              스케치
            </Highlight>
          </Text>
        </Flex>
        <Flex justifyContent="center" width={"100%"}>
          <Grid
            gridTemplateColumns={isMobile ? "1fr 1fr" : "1fr 1fr 1fr 1fr"}
            gap={isMobile ? "3px" : "3px"}
          >
            {fields.map((field) => (
              <FieldCard key={field.id} field={field} />
            ))}
          </Grid>
          <Spacer height={"10px"} />
        </Flex>
      </Content>
    </Area>
  );
};

export default Field;
