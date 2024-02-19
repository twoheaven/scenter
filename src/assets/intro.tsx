import useIsMobile from "@/hooks/useIsMobile";

import studyImg1 from "./교육.png";
import systemImg1 from "./시스템.png";
import partyImg1 from "./파티.png";
import eventImg1 from "./행사.png";

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
        style={{
          background:
            "linear-gradient(180deg, #e6e6e6 0%, #e9e9e9 1.63%, #f6f6f6 10.7%, #fdfdfd 22.82%, #ffffff 50.56%, #fdfdfd 78.98%, #f6f6f6 89.29%, #ebebeb 96.64%, #e2e2e2 100%)",
        }}
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
