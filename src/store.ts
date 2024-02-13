import { atom } from "jotai";

import { Division, Tab } from "./types/interfaces";

export const SingTabs: Tab[] = [
  {
    name: "어쿠스틱밴드",
    text: "어쿠스틱밴드",
    division: Division.BUSKING_ACOUSTIC_BAND,
  },
  {
    name: "통기타보컬",
    text: "통기타보컬",
    division: Division.BUSKING_ACOUSTIC_GUITAR_VOCAL,
  },
  {
    name: "가요&팝",
    text: "가요&팝",
    division: Division.BUSKING_KAYO_POP,
  },
  {
    name: "아카펠라",
    text: "아카펠라",
    division: Division.BUSKING_ACAPELLA,
  },
  {
    name: "팝페라",
    text: "팝페라",
    division: Division.BUSKING_POP_OPERA,
  },
  {
    name: "성악&합창",
    text: "성악&합창",
    division: Division.BUSKING_VOCAL_ENSEMBLE,
  },
  {
    name: "트로트",
    text: "트로트",
    division: Division.BUSKING_TROT,
  },
  {
    name: "힙합&비트박스",
    text: "힙합&비트박스",
    division: Division.BUSKING_HIPHOP_BEATBOX,
  },
];

export const PlayTabs: Tab[] = [
  {
    name: "재즈밴드",
    text: "재즈밴드",
    division: Division.BUSKING_JAZZ_BAND,
  },
  {
    name: "DJ",
    text: "DJ",
    division: Division.BUSKING_DJ,
  },
  {
    name: "클래식앙상블",
    text: "클래식앙상블",
    division: Division.BUSKING_CLASSICAL_ENSEMBLE,
  },
  {
    name: "전자현악",
    text: "전자현악",
    division: Division.BUSKING_ELECTRIC_STRING,
  },
  {
    name: "퓨전국악",
    text: "퓨전국악",
    division: Division.BUSKING_ROCK_BAND,
  },
  {
    name: "브라스밴드",
    text: "브라스밴드",
    division: Division.BUSKING_BRASS_BAND,
  },
  {
    name: "마칭밴드",
    text: "마칭밴드",
    division: Division.BUSKING_MATCHING_BAND,
  },
];

export const PerformanceTabs = [
  {
    name: "미디어퍼포먼스",
    text: "미디어퍼포먼스",
    division: Division.BUSKING_MEDIA_PERFORMANCE,
  },
  {
    name: "레이저트론",
    text: "레이저트론",
    division: Division.BUSKING_LASER_TRON,
  },
  {
    name: "매직&버블",
    text: "매직&버블",
    division: Division.BUSKING_MAGIC_BUBBLE,
  },
  {
    name: "저글링&마임",
    text: "저글링&마임",
    division: Division.BUSKING_JUGGLING_MIME,
  },
  {
    name: "타악(난타)",
    text: "타악(난타)",
    division: Division.BUSKING_TAAK_NANTA,
  },
  {
    name: "태권도",
    text: "태권도",
    division: Division.BUSKING_TAEKWONDO,
  },
  {
    name: "드로잉퍼포먼스",
    text: "드로잉퍼포먼스",
    division: Division.BUSKING_BRUSH_CALLIGRAPHY,
  },
  {
    name: "그 외 퍼포먼스",
    text: "그 외 퍼포먼스",
    division: Division.BUSKING_ETC,
  },
];

export const DanceTabs: Tab[] = [
  {
    name: "비보이&스트릿 댄스",
    text: "비보이&스트릿 댄스",
    division: Division.BUSKING_B_BOYING,
  },
  {
    name: "케이팝 댄스",
    text: "케이팝 댄스",
    division: Division.BUSKING_K_POP_DANCE,
  },
  {
    name: "치어리더",
    text: "치어리더",
    division: Division.BUSKING_CHEER,
  },
  {
    name: "뮤지컬갈라&무용",
    text: "뮤지컬갈라&무용",
    division: Division.BUSKING_MODERN,
  },
  {
    name: "전통무용",
    text: "전통무용",
    division: Division.BUSKING_TRADITIONAL,
  },
  {
    name: "그 외 댄스",
    text: "그 외 댄스",
    division: Division.BUSKING_POLE_VALLEY,
  },
];

export const MCTabs: Tab[] = [
  {
    name: "MC&아나운서",
    text: "MC&아나운서",
    division: Division.BUSKING_MC,
  },
];

export const TeamTabs: Tab[] = [
  {
    name: "sing",
    text: "노래",
    subTabs: SingTabs,
  },
  {
    name: "play",
    text: "연주",
    subTabs: PlayTabs,
  },
  {
    name: "performance",
    text: "퍼포먼스",
    subTabs: PerformanceTabs,
  },
  {
    name: "dance",
    text: "댄스&무용",
    subTabs: DanceTabs,
  },
  {
    name: "MC&아나운서",
    text: "MC&아나운서",
    subTabs: MCTabs,
  },
];

export const CelebrityTabs: Tab[] = [
  {
    name: "K-POP(아이돌)",
    text: "K-POP(아이돌)",
    division: Division.CELEB_K_POP_IDOL,
  },
  {
    name: "일반가요",
    text: "일반가요",
    division: Division.CELEB_GENERAL_KAYO,
  },
  {
    name: "트로트",
    text: "트로트",
    division: Division.CELEB_TROT,
  },
  {
    name: "힙합·DJ",
    text: "힙합·DJ",
    division: Division.CELEB_HIPHOP_DJ,
  },
  {
    name: "밴드",
    text: "밴드",
    division: Division.CELEB_BAND,
  },
  {
    name: "아나운서",
    text: "아나운서",
    division: Division.CELEB_ANNOUNCER,
  },
  {
    name: "개그맨",
    text: "개그맨",
    division: Division.CELEB_COMEDIAN,
  },
  {
    name: "유튜버/인플루언서",
    text: "유튜버/인플루언서",
    division: Division.CELEB_YOUTUBER,
  },
];

export const PartyTabs: Tab[] = [
  {
    name: "클럽파티",
    text: "클럽파티",
    division: Division.SYSTEM_SOUND,
  },
  {
    name: "VIP파티",
    text: "VIP파티",
    division: Division.SYSTEM_LIGHTING,
  },
  {
    name: "기타",
    text: "기타",
    division: Division.SYSTEM_VIDEO,
  },
];

export const modalListAtom = atom<React.ReactNode[]>([]);

export const activeTabAtom = atom<Tab>(TeamTabs[0]);
const defaultSubTab = TeamTabs[0].subTabs && TeamTabs[0].subTabs[0];
export const activeSubTabAtom = atom<Tab>(defaultSubTab || TeamTabs[0]);
export const divisionAtom = atom<Division>(Division.BUSKING_ACOUSTIC_BAND);
