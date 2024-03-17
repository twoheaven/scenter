import useIsMobile from "@/hooks/useIsMobile";

import eventImg1 from "./newevent.png";
import studyImg1 from "./newstudy.png";
import partyImg1 from "./party.png";
import systemImg1 from "./system.png";
import useWindowDimensions from "./useWindowDimensions";

const Intro = () => {
  return;
};

const EventIntro1 = () => {
  const isMobile = useIsMobile();
  const { width } = useWindowDimensions();
  const imageWidth = isMobile
    ? Math.min(width, 400)
    : Math.min(width, 1240) + "px";

  return (
    <>
      <img src={eventImg1} alt={"eventImg1"} width={imageWidth} />
    </>
  );
};

const PartyIntro1 = () => {
  const isMobile = useIsMobile();
  const { width } = useWindowDimensions();
  const imageWidth = isMobile
    ? Math.min(width, 400)
    : Math.min(width, 1240) + "px";
  return (
    <>
      <img src={partyImg1} alt={"partyImg1"} width={imageWidth} />
    </>
  );
};

const StudyIntro1 = () => {
  const isMobile = useIsMobile();
  const { width } = useWindowDimensions();
  const imageWidth = isMobile
    ? Math.min(width, 400)
    : Math.min(width, 1240) + "px";

  return (
    <>
      <img src={studyImg1} alt={"studyImg1"} width={imageWidth} />
    </>
  );
};

const SystemIntro1 = () => {
  const isMobile = useIsMobile();
  const { width } = useWindowDimensions();
  const imageWidth = isMobile
    ? Math.min(width, 400)
    : Math.min(width, 1240) + "px";

  return (
    <>
      <img src={systemImg1} alt={"studyImg1"} width={imageWidth} />
    </>
  );
};

Intro.EventIntro1 = EventIntro1;
Intro.PartyIntro1 = PartyIntro1;
Intro.StudyIntro1 = StudyIntro1;
Intro.SystemIntro1 = SystemIntro1;

export default Intro;
