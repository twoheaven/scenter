import defaultImageSvg from "./assets/default-image.svg";
import { Image, Picture, Team } from "./types/interfaces";

export const dummyTeams: Team[] = [
  {
    id: 1,
    division: "DIVISION_NAME",
    teamName: "Team Name",
    shortIntro: "Short Introduction",
    teamMany: 5,
    longIntro: "Long Introduction",
    portfolio: "Portfolio URL",
    repertoire: "Repertoire Details",
    equipment: "Equipment Details",
    mainPicture: {
      id: 1,
      boardIdx: 1,
      originalFileName: "band.jpg",
      storedFilePath:
        "https://www.rollingstone.com/wp-content/uploads/2022/12/TNMRollingStone_FrontLine-3.jpg?w=1581&h=1054&crop=1",
      fileSize: 123456,
    },
    subPictures: [
      {
        id: 2,
        boardIdx: 1,
        originalFileName: "grayband.jpg",
        storedFilePath:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Beatles_ad_1965_just_the_beatles_crop.jpg/640px-Beatles_ad_1965_just_the_beatles_crop.jpg",
        fileSize: 123456,
      },
    ],
    videos: [
      {
        id: 1,
        youtubeLink:
          "https://www.youtube.com/embed/erG5rgNYSdk?si=0GC-MJv-ehCnraFL",
      },
    ],
  },
  {
    id: 2,
    division: "DIVISION_NAME",
    teamName: "Team Name",
    shortIntro: "Short Introduction",
    teamMany: 5,
    longIntro: "Long Introduction",
    portfolio: "Portfolio URL",
    repertoire: "Repertoire Details",
    equipment: "Equipment Details",
    mainPicture: {
      id: 1,
      boardIdx: 1,
      originalFileName: "band.jpg",
      storedFilePath:
        "https://www.rollingstone.com/wp-content/uploads/2022/12/TNMRollingStone_FrontLine-3.jpg?w=1581&h=1054&crop=1",
      fileSize: 123456,
    },
    subPictures: [],
    videos: [],
  },
  {
    id: 3,
    division: "DIVISION_NAME",
    teamName: "Team Name",
    shortIntro: "Short Introduction",
    teamMany: 5,
    longIntro: "Long Introduction",
    portfolio: "Portfolio URL",
    repertoire: "Repertoire Details",
    equipment: "Equipment Details",
    mainPicture: {
      id: 1,
      boardIdx: 1,
      originalFileName: "band.jpg",
      storedFilePath:
        "https://www.rollingstone.com/wp-content/uploads/2022/12/TNMRollingStone_FrontLine-3.jpg?w=1581&h=1054&crop=1",
      fileSize: 123456,
    },
    subPictures: [],
    videos: [],
  },
  {
    id: 4,
    division: "DIVISION_NAME",
    teamName: "Team Name",
    shortIntro: "Short Introduction",
    teamMany: 5,
    longIntro: "Long Introduction",
    portfolio: "Portfolio URL",
    repertoire: "Repertoire Details",
    equipment: "Equipment Details",
    mainPicture: {
      id: 1,
      boardIdx: 1,
      originalFileName: "band.jpg",
      storedFilePath:
        "https://www.rollingstone.com/wp-content/uploads/2022/12/TNMRollingStone_FrontLine-3.jpg?w=1581&h=1054&crop=1",
      fileSize: 123456,
    },
    subPictures: [],
    videos: [],
  },
  {
    id: 5,
    division: "DIVISION_NAME",
    teamName: "Team Name",
    shortIntro: "Short Introduction",
    teamMany: 5,
    longIntro: "Long Introduction",
    portfolio: "Portfolio URL",
    repertoire: "Repertoire Details",
    equipment: "Equipment Details",
    mainPicture: {
      id: 1,
      boardIdx: 1,
      originalFileName: "band.jpg",
      storedFilePath:
        "https://www.rollingstone.com/wp-content/uploads/2022/12/TNMRollingStone_FrontLine-3.jpg?w=1581&h=1054&crop=1",
      fileSize: 123456,
    },
    subPictures: [],
    videos: [],
  },
];

export const defaultImage: Image = {
  id: 1,
  originalFileName: "default-image.svg",
  storedFilePath: defaultImageSvg,
  fileSize: 102400,
};

export const defaultPicture: Picture = {
  ...defaultImage,
  boardIdx: 1,
};
