import { CSSProperties } from "react";

import useIsMobile from "@/hooks/useIsMobile";

import eventImg1 from "./event_img_1.jpg";
import eventImg2 from "./event_img_2.jpg";
import partyImg1 from "./event_img_1.jpg";
import partyImg2 from "./event_img_2.jpg";
import studyImg1 from "./event_img_1.jpg";
import studyImg2 from "./event_img_2.jpg";

interface IntroProps {
  width?: CSSProperties["width"];
}

const Intro = () => {
  return;
};

const EventIntro1 = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <img
        src={eventImg1}
        alt={"eventImg1"}
        width={isMobile ? "300px" : "1240px"}
      />
    </>
  );
};
const EventIntro2 = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <img
        src={eventImg2}
        alt={"eventImg2"}
        width={isMobile ? "300px" : "1240px"}
      />
    </>
  );
};

const PartyIntro1 = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <img
        src={partyImg1}
        alt={"partyImg1"}
        width={isMobile ? "300px" : "1240px"}
      />
    </>
  );
};
const PartyIntro2 = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <img
        src={partyImg2}
        alt={"partyImg2"}
        width={isMobile ? "300px" : "1240px"}
      />
    </>
  );
};

const StudyIntro1 = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <img
        src={studyImg1}
        alt={"studyImg1"}
        width={isMobile ? "300px" : "1240px"}
      />
    </>
  );
};
const StudyIntro2 = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <img
        src={studyImg2}
        alt={"studyImg2"}
        width={isMobile ? "300px" : "1240px"}
      />
    </>
  );
};

Intro.EventIntro1 = EventIntro1;
Intro.EventIntro2 = EventIntro2;
Intro.PartyIntro1 = PartyIntro1;
Intro.PartyIntro2 = PartyIntro2;
Intro.StudyIntro1 = StudyIntro1;
Intro.StudyIntro2 = StudyIntro2;

export default Intro;
