import { Flex, Spacer, Text } from "@dohyun-ko/react-atoms";

import colorSet from "@/styles/color-set";
import Fonts from "@/styles/fonts";

interface InnerSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const InnerSection = ({ title, description, children }: InnerSectionProps) => {
  return (
    <Flex flexDirection={"column"}>
      <Flex gap={"10px"} alignItems={"end"}>
        <Text font={Fonts.Medium} size={"20px"}>
          {title}
        </Text>
        <Text
          color={colorSet.textLight}
          size={"14px"}
          style={{
            marginBottom: "2px",
          }}
        >
          {description}
        </Text>
      </Flex>

      <Spacer height={"25px"} />

      {children}
    </Flex>
  );
};

export default InnerSection;
