import { Area, Content, Flex, Spacer } from "@dohyun-ko/react-atoms";

import EventPageHeader from "@/components/pageHeader/EventPageHeader";

import Intro from "../../assets/intro";

const EventPage = () => {
  return (
    <Area>
      <Spacer height={"50px"} />

      <EventPageHeader />

      <Spacer height={"30px"} />

      <Content>
        <Flex justifyContent="center">
          <Intro.EventIntro1 />
        </Flex>
      </Content>

      <Spacer height={"100px"} />
    </Area>
  );
};

export default EventPage;
