import { CSSProperties } from "react";

import celebrity from "./celebrity.png";
import eventimg from "./eventimg.png";
import liveMusicGray from "./live-music-gray.png";
import party from "./party.png";
import speaker from "./speaker.png";
import study from "./study.png";

interface IconProps {
  size?: CSSProperties["width"];
  color?: CSSProperties["color"];
}

const Icons = () => {
  return;
};

const Team = ({ size = "24px" }: IconProps) => {
  return (
    <img src={liveMusicGray} alt={"live music"} width={size} height={size} />
  );
};

const Star = ({ size = "24px" }: IconProps) => {
  return <img src={celebrity} alt={"celebrity"} width={size} height={size} />;
};

const Speaker = ({ size = "24px" }: IconProps) => {
  return <img src={speaker} alt={"settings"} width={size} height={size} />;
};

const Party = ({ size = "24px" }: IconProps) => {
  return <img src={party} alt={"settings"} width={size} height={size} />;
};

const Event = ({ size = "24px" }: IconProps) => {
  return <img src={eventimg} alt={"settings"} width={size} height={size} />;
};

const Study = ({ size = "24px" }: IconProps) => {
  return <img src={study} alt={"settings"} width={size} height={size} />;
};

const Search = ({ size = "24px", color = "#000000" }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      width={size}
    >
      <path
        fill={color}
        d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"
      />
    </svg>
  );
};

const ArrowRight = ({ size = "24px", color = "#000000" }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      width={size}
    >
      <path
        fill={color}
        d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"
      />
    </svg>
  );
};

const ArrowLeft = ({ size = "24px", color = "#000000" }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      width={size}
    >
      <path
        fill={color}
        d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"
      />
    </svg>
  );
};

Icons.Team = Team;
Icons.Star = Star;
Icons.Speaker = Speaker;
Icons.Search = Search;

Icons.Party = Party;
Icons.Event = Event;
Icons.Study = Study;

Icons.ArrowLeft = ArrowLeft;
Icons.ArrowRight = ArrowRight;

export default Icons;
