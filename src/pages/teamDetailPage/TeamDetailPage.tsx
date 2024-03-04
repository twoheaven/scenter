import {
  Area,
  Button,
  Content,
  Divider,
  Flex,
  Input,
  Spacer,
  Text,
} from "@dohyun-ko/react-atoms";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import YouTube from "react-youtube";

import { deleteText, deleteVideo, getText, postVideo } from "@/apis/text-api";
import CelebrityPageHeader from "@/components/pageHeader/CelebrityPageHeader";
import SystemPageHeader from "@/components/pageHeader/SystemPageHeader";
import useIsMobile from "@/hooks/useIsMobile";
import { modalListAtom } from "@/store";
import colorSet from "@/styles/color-set";
import Fonts from "@/styles/fonts";
import { Division, Picture } from "@/types/interfaces";
import Paths from "@/types/paths";
import QueryKeys from "@/types/queryKeys";
import {
  getYoutubeVideoId,
  isCelebrity,
  isLoggedIn,
  isTeam,
} from "@/utils/utils";

import TeamPageHeader from "../../components/pageHeader/TeamPageHeader";
import ImageUpdateModal from "./ImageUpdateModal";
import ImageView from "./ImageView";
import InnerSection from "./InnerSection";

const TeamDetailPage = () => {
  const { id } = useParams();

  const { data, isError } = useQuery(
    [
      QueryKeys.getText,
      {
        id: Number(id),
      },
    ],
    getText,
    {
      enabled: !!id,
    },
  );

  const [, setModalList] = useAtom(modalListAtom);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [youtubeWidth, setYoutubeWidth] = useState<number>(0);

  const isMobile = useIsMobile();

  const pictures: Picture[] = data?.mainPicture
    ? [data.mainPicture, ...data.subPictures]
    : [];

  const division = data ? (data.division as Division) : null;

  const deleteVideoMutation = useMutation(deleteVideo);
  const createVideoMutation = useMutation(postVideo);

  const queryClient = useQueryClient();

  useEffect(() => {
    const onResize = () => {
      if (isMobile) {
        setYoutubeWidth(window.innerWidth - 50);
      } else {
        setYoutubeWidth(Math.min(window.innerWidth * 0.75, 1240) / 1.6 - 10);
      }
    };
    window.addEventListener("resize", onResize);

    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [isMobile]);

  const handleVideoSubmit = () => {
    if (!videoUrl || !data) {
      return;
    }

    createVideoMutation.mutate(
      {
        id: data.id,
        youtubeLink: videoUrl,
      },
      {
        onSuccess: () => {
          setVideoUrl("");
          queryClient.invalidateQueries([QueryKeys.getText]);
          queryClient.invalidateQueries([QueryKeys.getTexts]);
          toast.success("영상이 추가되었습니다");
        },
      },
    );
  };

  const handleVideoDelete = (videoId: number) => {
    if (!data) {
      return;
    }

    deleteVideoMutation.mutate(
      {
        id: data.id,
        videoId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([QueryKeys.getText]);
          queryClient.invalidateQueries([QueryKeys.getTexts]);
          toast.success("영상이 삭제되었습니다");
        },
      },
    );
  };

  return isError ? (
    <Text>존재하지 않는 팀입니다</Text>
  ) : (
    <Area>
      <Spacer height={"50px"} />

      {division &&
        (isTeam(division) ? (
          <TeamPageHeader />
        ) : isCelebrity(division) ? (
          <CelebrityPageHeader />
        ) : (
          <SystemPageHeader />
        ))}

      <Spacer height={"30px"} />

      {data && (
        <Content>
          <Flex justifyContent={"space-between"} alignItems={"start"}>
            <Flex width={isMobile ? "100%" : "60%"}>
              <ImageView images={pictures} />

              {isLoggedIn() && (
                <Button
                  backgroundColor={colorSet.primary}
                  onClick={() => {
                    setModalList((prev) => [
                      ...prev,
                      <ImageUpdateModal key={data.id} team={data} />,
                    ]);
                  }}
                  style={{
                    padding: "5px 10px",
                    borderRadius: "3px",
                  }}
                >
                  <Text>이미지 수정하기</Text>
                </Button>
              )}

              <Spacer height={isMobile ? "30px" : "80px"} />

              {isMobile && <TeamInfoCard />}

              <Divider />

              <Spacer height={"30px"} />

              <Flex
                flexDirection={"column"}
                gap={"5px"}
                width={"100%"}
                alignItems={"center"}
              >
                {data?.videos.map((video) => (
                  <Flex
                    key={video.id}
                    flexDirection={"column"}
                    alignItems={"center"}
                  >
                    <Flex
                      style={{
                        position: "relative",
                        overflow: "hidden",
                        width: youtubeWidth,
                        height: youtubeWidth * 0.5625,
                      }}
                      alignItems={"center"}
                    >
                      <YouTube
                        videoId={
                          getYoutubeVideoId(video.youtubeLink || "") || ""
                        }
                        opts={{
                          width: youtubeWidth,
                          height: youtubeWidth * 0.5625 + 120,
                          playerVars: {
                            controls: 0,
                          },
                        }}
                        style={{
                          position: "relative",
                          top: isMobile ? "-60px" : "-60px",
                        }}
                      />
                    </Flex>
                    {isLoggedIn() && (
                      <Button
                        backgroundColor={colorSet.primary}
                        onClick={() => {
                          handleVideoDelete(video.id);
                        }}
                        style={{
                          padding: "5px 10px",
                          borderRadius: "3px",
                        }}
                      >
                        <Text>삭제하기</Text>
                      </Button>
                    )}
                  </Flex>
                ))}

                {data?.videos.length === 0 && <Text>영상이 없습니다</Text>}

                {isLoggedIn() && (
                  <Flex gap={"10px"}>
                    <Input
                      value={videoUrl}
                      onChange={(e) => {
                        setVideoUrl(e.target.value);
                      }}
                      placeholder={"유튜브 URL을 입력하세요"}
                      style={{
                        border: `1px solid ${colorSet.lineGray}`,
                        borderRadius: "10px",
                        padding: "8px 10px",
                      }}
                    />
                    <Button
                      backgroundColor={colorSet.primary}
                      onClick={handleVideoSubmit}
                      style={{
                        padding: "5px 10px",
                        borderRadius: "3px",
                      }}
                    >
                      <Text>추가하기</Text>
                    </Button>
                  </Flex>
                )}
              </Flex>

              <Spacer height={"20px"} />

              <Divider />

              <Spacer height={"30px"} />

              <InnerSection title={"포트폴리오"} description={""}>
                <Text
                  color={colorSet.textGray}
                  style={{
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {data.portfolio}
                </Text>
              </InnerSection>

              <Spacer height={"20px"} />

              <Divider />

              <Spacer height={"30px"} />

              <InnerSection title={"레파토리"} description={""}>
                <Text
                  color={colorSet.textGray}
                  style={{
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {data.repertoire}
                </Text>
              </InnerSection>

              <Spacer height={"20px"} />

              <Divider />

              <Spacer height={"30px"} />

              <InnerSection title={"필요사항"} description={""}>
                <Text
                  color={colorSet.textGray}
                  style={{
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {data.equipment}
                </Text>
              </InnerSection>
            </Flex>

            {!isMobile && <TeamInfoCard />}
          </Flex>
        </Content>
      )}

      <Spacer height={"100px"} />
    </Area>
  );
};

const TeamInfoCard = () => {
  const { id } = useParams();

  const { data } = useQuery(
    [
      QueryKeys.getText,
      {
        id: Number(id),
      },
    ],
    getText,
    {
      enabled: !!id,
    },
  );

  const deleteTextMutation = useMutation(deleteText);

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const handleTextDelete = () => {
    if (!data) {
      return;
    }

    if (!window.confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    deleteTextMutation.mutate(
      {
        id: data.id,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([QueryKeys.getText]);
          queryClient.invalidateQueries([QueryKeys.getTexts]);
          toast.success("삭제되었습니다");
          navigate(Paths.Main);
        },
        onError: () => {
          toast.error("삭제에 실패했습니다");
        },
      },
    );
  };

  const isMobile = useIsMobile();

  return (
    <Flex width={isMobile ? "100%" : "calc(35% - 20px)"}>
      <Flex
        width={"100%"}
        flexDirection={"column"}
        style={{
          padding: "10px",
          border: `1px solid ${colorSet.lineGray}`,
        }}
      >
        <Text font={Fonts.Bold} size={"20px"}>
          {data?.teamName}
        </Text>

        <Text size={"16px"} color={colorSet.textLight}>
          {data?.shortIntro}
        </Text>

        <Text font={Fonts.Bold} color={colorSet.primary} size={"24px"}>
          SC Ent 연결
        </Text>

        <Spacer height={"5px"} />

        <Button
          backgroundColor={colorSet.primary}
          borderRadius={"15px"}
          width={"120px"}
          height={"30px"}
          onClick={() => navigate(Paths.Contact)}
        >
          <Text size={"12px"} color={"white"}>
            문의하기
          </Text>
        </Button>
      </Flex>

      <Spacer height={"20px"} />

      <Flex
        width={"100%"}
        flexDirection={"column"}
        style={{
          padding: "10px",
          border: `1px solid ${colorSet.lineGray}`,
        }}
        gap={"10px"}
      >
        <Text font={Fonts.Medium} size={"16px"}>
          소개
        </Text>

        <Text
          color={colorSet.textLight}
          size={"16px"}
          style={{
            whiteSpace: "pre-wrap",
          }}
        >
          {data?.longIntro}
        </Text>
      </Flex>

      <Spacer height={"20px"} />

      {isLoggedIn() && (
        <Flex gap={"10px"}>
          <Button
            backgroundColor={colorSet.primary}
            onClick={() => {
              navigate(Paths.ContentCreate + "?teamId=" + data?.id);
            }}
            style={{
              padding: "5px 10px",
              borderRadius: "3px",
            }}
          >
            <Text>수정하기</Text>
          </Button>
          <Button
            backgroundColor={"coral"}
            onClick={handleTextDelete}
            style={{
              padding: "5px 10px",
              borderRadius: "3px",
            }}
          >
            <Text>삭제하기</Text>
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default TeamDetailPage;
