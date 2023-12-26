import { Area, Content, Flex, Spacer } from "@dohyun-ko/react-atoms";

import EventPageHeader from "@/components/pageHeader/EventPageHeader";
import useIsMobile from "@/hooks/useIsMobile";

import Intro from "../../assets/intro";

interface EventPageProps {}

const EventPage = ({}: EventPageProps) => {
  const isMobile = useIsMobile();

  return (
    <Area>
      <Spacer height={"50px"} />

      <EventPageHeader />

      <Spacer height={"30px"} />

      <Content>
        <Flex justifyContent="center">
          <Intro.EventIntro1 />
        </Flex>
        <Flex justifyContent="center">
          <Intro.EventIntro2 />
        </Flex>
      </Content>

      <Spacer height={"100px"} />
    </Area>
  );
};

export default EventPage;
