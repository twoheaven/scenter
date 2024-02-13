import useIsMobile from "@/hooks/useIsMobile";

import eventImg1 from "./event_img1.png";
import partyImg1 from "./party_img1.png";
import studyImg1 from "./study_img1.png";
import systemImg1 from "./system_img1.png";

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

const SystemIntro1 = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <img
        src={systemImg1}
        alt={"studyImg1"}
        width={isMobile ? "300px" : "1240px"}
      />
    </>
  );
};

Intro.EventIntro1 = EventIntro1;
Intro.PartyIntro1 = PartyIntro1;
Intro.StudyIntro1 = StudyIntro1;
Intro.SystemIntro1 = SystemIntro1;

export default Intro;
