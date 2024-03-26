import {
  Area,
  Content,
  Flex,
  Grid,
  Highlight,
  Spacer,
  Text,
} from "@dohyun-ko/react-atoms";
import React, { useEffect, useState } from "react";

import useIsMobile from "@/hooks/useIsMobile";
import colorSet from "@/styles/color-set";
import Fonts from "@/styles/fonts";
import { Field } from "@/types/interfaces";
import { isLoggedIn } from "@/utils/utils";

import FieldCard from "./FieldCard";
import FieldUpdateModal from "./FieldUpdateModal";

const FieldSection = () => {
  const isMobile = useIsMobile();
  const [fields, setFields] = useState<Field[]>([]);

  useEffect(() => {
    fetch("https://mediarts.co.kr/api/fields/get")
      .then((response) => response.json())
      .then((data) => {
        setFields(data);
      })
      .catch((error) => {
        console.error("Error fetching fields:", error);
      });
  }, []);

  return (
    <Area>
      <Content>
        <Flex
          justifyContent="center"
          style={{
            position: "relative",
          }}
        >
          <Text size={isMobile ? "1.5rem" : "1.875rem"}>
            <Highlight
              color={colorSet.primary}
              style={{
                fontFamily: Fonts.Bold,
              }}
            >
              현장
            </Highlight>{" "}
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
        <Spacer height="20px" />
        <Flex justifyContent="center" width="100%">
          <Grid
            gridTemplateColumns={isMobile ? "1fr 1fr" : "1fr 1fr 1fr 1fr"}
            gap="3px"
          >
            {fields.map((field) => (
              <React.Fragment key={field.id}>
                <FieldCard field={field} />
                {isLoggedIn() && (
                  <Flex flexDirection="column">
                    <FieldUpdateModal field={field} />
                  </Flex>
                )}
              </React.Fragment>
            ))}
          </Grid>
          <Spacer height="10px" />
        </Flex>
      </Content>
    </Area>
  );
};

export default FieldSection;
