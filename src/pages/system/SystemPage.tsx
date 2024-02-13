import { Area, Content, Flex, Spacer } from "@dohyun-ko/react-atoms";

import Intro from "@/assets/intro";
import SystemPageHeader from "@/components/pageHeader/SystemPageHeader";

const SystemPage = () => {
  return (
    <Area>
      <Spacer height={"50px"} />

      <SystemPageHeader />

      <Spacer height={"30px"} />

      <Content>
        <Flex justifyContent="center">
          <Intro.SystemIntro1 />
        </Flex>
      </Content>

      <Spacer height={"100px"} />
    </Area>
  );
};

export default SystemPage;
