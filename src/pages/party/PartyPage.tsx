import { Area, Content, Flex, Grid, Spacer } from "@dohyun-ko/react-atoms";

import Intro from "@/assets/intro";
import PartyPageHeader from "@/components/pageHeader/PartyPageHeader";
import useIsMobile from "@/hooks/useIsMobile";

interface PartyPageProps {}

const PartyPage = ({}: PartyPageProps) => {
  const isMobile = useIsMobile();

  return (
    <Area>
      <Spacer height={"50px"} />

      <PartyPageHeader />

      <Spacer height={"30px"} />

      <Content>
        <Flex justifyContent="center">
          <Intro.PartyIntro1 />
        </Flex>
        <Flex justifyContent="center">
          <Intro.PartyIntro2 />
        </Flex>
      </Content>

      <Spacer height={"100px"} />
    </Area>
  );
};

export default PartyPage;
