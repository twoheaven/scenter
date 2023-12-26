import { Area, Content, Flex, Grid, Spacer } from "@dohyun-ko/react-atoms";

import Intro from "@/assets/intro";
import StudyPageHeader from "@/components/pageHeader/StudyPageHeader";
import useIsMobile from "@/hooks/useIsMobile";

interface StudyPageProps {}

const StudyPage = ({}: StudyPageProps) => {
  const isMobile = useIsMobile();

  return (
    <Area>
      <Spacer height={"50px"} />

      <StudyPageHeader />

      <Spacer height={"30px"} />

      <Content>
        <Flex justifyContent="center">
          <Intro.StudyIntro1 />
        </Flex>
      </Content>

      <Spacer height={"100px"} />
    </Area>
  );
};

export default StudyPage;
