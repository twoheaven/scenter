import {
  CelebrityTabs,
  DanceTabs,
  MCTabs,
  PartyTabs,
  PerformanceTabs,
  PlayTabs,
  SingTabs,
} from "@/store";
import { Division, Team as Text } from "@/types/interfaces";

// YouTube 비디오 URL에서 동영상 ID를 추출하는 함수
export function getYoutubeVideoId(url: string) {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
}

// 텍스트 목록을 특정 division에 따라 필터링하는 함수
export const divideTexts = (texts: Text[], division: Division) => {
  return texts.filter((text) => text.division === division);
};

// 사용자가 로그인 상태인지 확인하는 함수
export const isLoggedIn = () => {
  return localStorage.getItem("access_token") !== null;
};

// 텍스트 목록을 특정 탭에 속하는 것들만 필터링하는 함수
export const filterTeams = (texts: Text[]) => {
  return texts.filter((text) =>
    [
      ...SingTabs,
      ...PlayTabs,
      ...PerformanceTabs,
      ...DanceTabs,
      ...MCTabs,
    ].some((tab) => tab.division === text.division),
  );
};

// 텍스트 목록을 연예인 탭에 속하는 것들만 필터링하는 함수
export const filterCelebrities = (texts: Text[]) => {
  return texts.filter((text) =>
    CelebrityTabs.some((tab) => tab.division === text.division),
  );
};

// 텍스트 목록을 시스템 탭에 속하는 것들만 필터링하는 함수
export const filterSystems = (texts: Text[]) => {
  return texts.filter((text) =>
    PartyTabs.some((tab) => tab.division === text.division),
  );
};

// 특정 division이 공연팀에 속하는지 확인하는 함수
export const isTeam = (division: Division) => {
  return [
    ...SingTabs,
    ...PlayTabs,
    ...PerformanceTabs,
    ...DanceTabs,
    ...MCTabs,
  ].some((tab) => tab.division === division);
};

// 특정 division이 연예인에 속하는지 확인하는 함수
export const isCelebrity = (division: Division) => {
  return CelebrityTabs.some((tab) => tab.division === division);
};

// 특정 division이 시스템에 속하는지 확인하는 함수
export const isParty = (division: Division) => {
  return PartyTabs.some((tab) => tab.division === division);
};

// division을 한글로 변환하는 함수
export const divisionToKorean = (division: string) => {
  const allTabs = [
    ...SingTabs,
    ...PlayTabs,
    ...PerformanceTabs,
    ...DanceTabs,
    ...MCTabs,
    ...CelebrityTabs,
    ...PartyTabs,
  ];

  return allTabs.find((tab) => tab.division === division)?.name;
};

// 텍스트 내의 줄 바꿈 문자를 HTML 줄 바꿈 태그로 변환하는 함수
export const parseBreakline = (text: string) => {
  return text.split("\n").join("<br />");
};
