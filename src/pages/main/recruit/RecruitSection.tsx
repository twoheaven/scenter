import {
  Area,
  Button,
  Flex,
  Grid,
  Highlight,
  Input,
  Spacer,
  Text,
} from "@dohyun-ko/react-atoms";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import YouTube from "react-youtube";

import { deleteRecruit, getRecruits, postRecruit } from "@/apis/recruit-api";
import useIsMobile from "@/hooks/useIsMobile";
import colorSet from "@/styles/color-set";
import Fonts from "@/styles/fonts";
import QueryKeys from "@/types/queryKeys";
import { getYoutubeVideoId, isLoggedIn } from "@/utils/utils";

const RecruitSection = () => {
  const { data } = useQuery([QueryKeys.getRecruits], getRecruits);

  const isMobile = useIsMobile();

  const postVideoMutation = useMutation(postRecruit);
  const deleteVideoMutation = useMutation(deleteRecruit);

  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const [youtubeWidth, setYoutubeWidth] = useState<number>(0);

  const queryClient = useQueryClient();

  const handleYoutubeSubmit = () => {
    if (!youtubeUrl) {
      return;
    }

    postVideoMutation.mutate(
      {
        recruit: { youtubeLink: youtubeUrl },
      },
      {
        onSuccess: () => {
          toast.success("추가되었습니다");
          queryClient.invalidateQueries([QueryKeys.getRecruits]);
          queryClient.invalidateQueries([QueryKeys.getRecruit]);
        },
        onError: () => {
          toast.error("추가에 실패했습니다");
        },
      },
    );
  };

  const handleDeleteYoutube = (id: number) => {
    deleteVideoMutation.mutate(
      {
        id,
      },
      {
        onSuccess: () => {
          toast.success("삭제되었습니다");
          queryClient.invalidateQueries([QueryKeys.getRecruits]);
          queryClient.invalidateQueries([QueryKeys.getRecruit]);
        },
        onError: () => {
          toast.error("삭제에 실패했습니다");
        },
      },
    );
  };

  useEffect(() => {
    const onResize = () => {
      if (isMobile) {
        setYoutubeWidth(window.innerWidth - 50);
      } else {
        setYoutubeWidth(Math.min(window.innerWidth * 0.75) / 2 - 10);
      }
    };
    window.addEventListener("resize", onResize);

    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [isMobile]);

  return (
    <Area>
      <Flex
        justifyContent={"center"}
        style={{
          position: "relative",
        }}
      >
        <Text size={isMobile ? "1.5rem" : "1.875rem"}>
          <Highlight
            color={colorSet.primary}
            style={{
              fontFamily: Fonts.Bold,
            }}
          >
            최근
          </Highlight>{" "}
          <Highlight
            color={colorSet.text}
            style={{
              fontFamily: Fonts.Bold,
            }}
          >
            콘텐츠
          </Highlight>
        </Text>
      </Flex>

      {isLoggedIn() && (
        <Flex gap={"10px"} alignItems={"center"}>
          <Input
            width={"60%"}
            value={youtubeUrl}
            onChange={(e) => {
              setYoutubeUrl(e.target.value);
            }}
            placeholder={"유튜브 URL를 입력해주세요"}
            style={{
              border: `1px solid ${colorSet.lineGray}`,
              borderRadius: "10px",
              padding: "8px 10px",
            }}
          />

          <Button
            backgroundColor={colorSet.primary}
            onClick={handleYoutubeSubmit}
            style={{
              padding: "5px 10px",
              borderRadius: "3px",
            }}
          >
            <Text>추가하기</Text>
          </Button>
        </Flex>
      )}

      <Spacer height={"30px"} />

      <Grid gap={"10px"} gridTemplateColumns={isMobile ? "1fr" : "1fr 1fr"}>
        {data?.map((recruit) => (
          <Flex
            key={recruit.id}
            style={{
              position: "relative",
              overflow: "hidden",
              width: youtubeWidth,
              height: youtubeWidth * 0.5625,
            }}
            alignItems={"center"}
          >
            <YouTube
              videoId={getYoutubeVideoId(recruit.youtubeLink || "") || ""}
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
            {isLoggedIn() && (
              <Button
                backgroundColor={colorSet.primary}
                style={{
                  padding: "10px 20px",

                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                }}
                onClick={() => {
                  handleDeleteYoutube(recruit.id);
                }}
              >
                <Text>삭제</Text>
              </Button>
            )}
          </Flex>
        ))}
      </Grid>

      <Spacer height={"50px"} />
    </Area>
  );
};

export default RecruitSection;
