import { Area, Content, Flex, Spacer } from "@dohyun-ko/react-atoms";

import Intro from "@/assets/intro";
import PartyPageHeader from "@/components/pageHeader/PartyPageHeader";

const PartyPage = () => {
  return (
    <Area>
      <Spacer height={"50px"} />

      <PartyPageHeader />

      <Spacer height={"30px"} />

      <Content>
        <Flex justifyContent="center">
          <Intro.PartyIntro1 />
        </Flex>
      </Content>

      <Spacer height={"100px"} />
    </Area>
  );
};

export default PartyPage;
