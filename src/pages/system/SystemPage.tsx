import { Area, Content, Flex, Grid, Spacer } from "@dohyun-ko/react-atoms";

import Intro from "@/assets/intro";
import SystemPageHeader from "@/components/pageHeader/SystemPageHeader";
import useIsMobile from "@/hooks/useIsMobile";

interface SystemPageProps {}

const SystemPage = ({}: SystemPageProps) => {
  const isMobile = useIsMobile();

  return (
    <Area>
      <Spacer height={"50px"} />

      <SystemPageHeader />

      <Spacer height={"30px"} />

      <Content>
        <Flex justifyContent="center">
          <Intro.StudyIntro1 />
        </Flex>
        <Flex justifyContent="center">
          <Intro.StudyIntro2 />
        </Flex>
      </Content>

      <Spacer height={"100px"} />
    </Area>
  );
};

export default SystemPage;
