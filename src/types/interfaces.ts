// 탭을 나타내는 인터페이스입니다.
export interface Tab {
  name: string; // 탭의 고유 식별자
  text: string; // 탭에 표시되는 텍스트
  subTabs?: Tab[]; // 이 탭 아래에 속하는 하위 탭 (선택 사항)
  division?: Division; // 이 탭과 관련된 부문 (선택 사항)
}

// 이미지에 대한 추가 정보를 포함하는 인터페이스입니다.
export interface Picture extends Image {
  boardIdx: number; // 이미지와 연관된 게시판의 식별자
}

// 배너에 대한 추가 정보를 포함하는 인터페이스입니다.
export interface Banner extends Image {
  backcolor: string; // 배너의 배경 색상
}

export interface Field extends Image {
  title: string;
  date: string;
  location: string;
  casting: string;
}

// 비디오에 대한 정보를 나타내는 인터페이스입니다.
export interface Video {
  id: number; // 비디오의 고유 식별자
  youtubeLink: string; // 비디오의 YouTube 링크
}

// 팀에 대한 정보를 나타내는 인터페이스입니다.
export interface Team {
  id: number; // 팀의 고유 식별자
  division: string; // 팀의 부문/카테고리 (문자열 값으로 표현)
  teamName: string; // 팀의 이름
  shortIntro: string; // 팀에 대한 간단한 소개
  teamMany: number; // 팀 멤버 수
  longIntro: string; // 팀에 대한 상세 소개
  portfolio: string; // 포트폴리오 URL
  repertoire: string; // 레퍼토리 정보
  equipment: string; // 장비 정보
  mainPicture: Picture | null; // 팀과 관련된 주요 이미지 (nullable)
  subPictures: Picture[]; // 팀과 관련된 추가 이미지들
  videos: Video[]; // 팀과 관련된 비디오들
}

// 추천에 대한 정보를 나타내는 인터페이스입니다.
export interface Recommend {
  id: string | null; // 추천의 고유 식별자 (nullable)
  id1: string | null; // 추가 식별자들 (nullable)
  id2: string | null;
  id3: string | null;
  id4: string | null;
  id5: string | null;
  id6: string | null;
}

// 채용 정보와 관련된 인터페이스입니다. YouTube 링크를 포함합니다.
export interface Recruit {
  id: number; // 채용의 고유 식별자
  youtubeLink: string; // 채용의 YouTube 링크
}

// 페이지네이션된 목록 응답에 대한 인터페이스입니다.
export interface ListResponse<T> {
  content: T[]; // 항목들의 배열
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number; // 전체 페이지 수
  totalElements: number; // 전체 요소 수
  last: boolean; // 마지막 페이지 여부
  size: number; // 페이지 크기
  number: number; // 현재 페이지 번호
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  numberOfElements: number; // 현재 페이지의 요소 수
  first: boolean; // 첫 번째 페이지 여부
  empty: boolean; // 내용이 비어 있는지 여부
}

// 다양한 부문 또는 카테고리를 나타내는 열거형입니다.
export enum Division {
  // 버스킹 부문들
  BUSKING_ACOUSTIC_BAND = "BUSKING_ACOUSTIC_BAND",
  BUSKING_ACOUSTIC_GUITAR_VOCAL = "BUSKING_ACOUSTIC_GUITAR_VOCAL",
  BUSKING_KAYO_POP = "BUSKING_KAYO_POP",
  BUSKING_ACAPELLA = "BUSKING_ACAPELLA",
  BUSKING_POP_OPERA = "BUSKING_POP_OPERA",
  BUSKING_VOCAL_ENSEMBLE = "BUSKING_VOCAL_ENSEMBLE",
  BUSKING_TROT = "BUSKING_TROT",
  BUSKING_HIPHOP_BEATBOX = "BUSKING_HIPHOP_BEATBOX",
  BUSKING_DJ = "BUSKING_DJ",
  BUSKING_CLASSICAL_ENSEMBLE = "BUSKING_CLASSICAL_ENSEMBLE",
  BUSKING_ELECTRIC_STRING = "BUSKING_ELECTRIC_STRING",
  BUSKING_FUSION = "BUSKING_FUSION",
  BUSKING_JAZZ_BAND = "BUSKING_JAZZ_BAND",
  BUSKING_BRASS_BAND = "BUSKING_BRASS_BAND",
  BUSKING_MATCHING_BAND = "BUSKING_MATCHING_BAND",
  BUSKING_MEDIA_PERFORMANCE = "BUSKING_MEDIA_PERFORMANCE",
  BUSKING_LASER_TRON = "BUSKING_LASER_TRON",
  BUSKING_MAGIC_BUBBLE = "BUSKING_MAGIC_BUBBLE",
  BUSKING_JUGGLING_MIME = "BUSKING_JUGGLING_MIME",
  BUSKING_TAAK_NANTA = "BUSKING_TAAK_NANTA",
  BUSKING_TAEKWONDO = "BUSKING_TAEKWONDO",
  BUSKING_BRUSH_CALLIGRAPHY = "BUSKING_BRUSH_CALLIGRAPHY",
  BUSKING_ETC = "BUSKING_ETC",
  BUSKING_B_BOYING = "BUSKING_B_BOYING",
  BUSKING_K_POP_DANCE = "BUSKING_K_POP_DANCE",
  BUSKING_CHEER = "BUSKING_CHEER",
  BUSKING_MODERN = "BUSKING_MODERN",
  BUSKING_TRADITIONAL = "BUSKING_TRADITIONAL",
  BUSKING_POLE_VALLEY = "BUSKING_POLE_VALLEY",
  BUSKING_MC = "BUSKING_MC",
  BUSKING_ROCK_BAND = "BUSKING_ROCK_BAND",
  // 연예 부문들
  CELEB_K_POP_IDOL = "CELEB_K_POP_IDOL",
  CELEB_GENERAL_KAYO = "CELEB_GENERAL_KAYO",
  CELEB_TROT = "CELEB_TROT",
  CELEB_HIPHOP_DJ = "CELEB_HIPHOP_DJ",
  CELEB_BAND = "CELEB_BAND",
  CELEB_ANNOUNCER = "CELEB_ANNOUNCER",
  CELEB_COMEDIAN = "CELEB_COMEDIAN",
  CELEB_YOUTUBER = "CELEB_YOUTUBER",
  // 시스템 부문들
  SYSTEM_SOUND = "SYSTEM_SOUND",
  SYSTEM_LIGHTING = "SYSTEM_LIGHTING",
  SYSTEM_VIDEO = "SYSTEM_VIDEO",
}
