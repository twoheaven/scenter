import {
  Area,
  Button,
  Content,
  Flex,
  Grid,
  Input,
  Spacer,
  Text,
  TextArea,
} from "@dohyun-ko/react-atoms";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { getText, postText, putText } from "@/apis/text-api";
import {
  CelebrityTabs,
  DanceTabs,
  MCTabs,
  PartyTabs,
  PerformanceTabs,
  PlayTabs,
  SingTabs,
} from "@/store";
import colorSet from "@/styles/color-set";
import Fonts from "@/styles/fonts";
import { Division } from "@/types/interfaces";
import Paths from "@/types/paths";
import QueryKeys from "@/types/queryKeys";

const ContentCreate = () => {
  const [searchParams] = useSearchParams();
  const { data } = useQuery(
    [
      QueryKeys.getText,
      {
        id: Number(searchParams.get("teamId")),
      },
    ],
    getText,
    {
      enabled: !!Number(searchParams.get("teamId")),
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchIntervalInBackground: false,
    },
  );

  const [divison, setDivision] = useState<Division>();
  const [name, setName] = useState("");
  const [shortIntro, setShortIntro] = useState("");
  const [teamMany, setTeamMany] = useState<number>(0);
  const [longIntro, setLongIntro] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [repertoire, setRepertoire] = useState("");
  const [equipment, setEquipment] = useState("");

  useEffect(() => {
    if (data) {
      setDivision(data.division as Division);
      setName(data.teamName);
      setShortIntro(data.shortIntro);
      setTeamMany(data.teamMany);
      setLongIntro(data.longIntro);
      setPortfolio(data.portfolio);
      setRepertoire(data.repertoire);
      setEquipment(data.equipment);
    }
  }, [data]);

  const createContent = useMutation(postText);
  const updateContent = useMutation(putText);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!divison) {
      toast.warn("분류를 선택해주세요");
      return;
    }

    if (!name) {
      toast.warn("팀명을 입력해주세요");
      return;
    }

    // if (!shortIntro) {
    //   toast.warn("간단 소개글을 입력해주세요");
    //   return;
    // }

    // if (!teamMany) {
    //   toast.warn("팀원 수를 입력해주세요");
    //   return;
    // }

    // if (!longIntro) {
    //   toast.warn("소개를 입력해주세요");
    //   return;
    // }

    // if (!portfolio) {
    //   toast.warn("포트폴리오를 입력해주세요");
    //   return;
    // }

    // if (!repertoire) {
    //   toast.warn("레파토리를 입력해주세요");
    //   return;
    // }

    // if (!equipment) {
    //   toast.warn("요청장비를 입력해주세요");
    //   return;
    // }

    const content = {
      division: divison,
      teamName: name,
      shortIntro: shortIntro || " ",
      teamMany: teamMany || 0,
      longIntro: longIntro || " ",
      portfolio: portfolio || " ",
      repertoire: repertoire || " ",
      equipment: equipment || " ",
    };

    Swal.fire({
      text: "콘텐츠 생성 중입니다",
      icon: "info",
      showConfirmButton: false,
    });

    if (searchParams.get("teamId")) {
      updateContent.mutate(
        {
          id: Number(searchParams.get("teamId")),
          ...content,
        },
        {
          onSuccess: (data) => {
            navigate(Paths.TeamDetail + data.id);
            Swal.fire({
              text: "콘텐츠가 수정되었습니다",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
          },

          onError: () => {
            Swal.fire({
              text: "콘텐츠 수정에 실패했습니다",
              icon: "error",
              showConfirmButton: false,
              timer: 1500,
            });
          },
        },
      );
    } else {
      createContent.mutate(content, {
        onSuccess: (data) => {
          navigate(Paths.TeamDetail + data.id);
          Swal.fire({
            text: "콘텐츠가 생성되었습니다",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        },

        onError: () => {
          Swal.fire({
            text: "콘텐츠 생성에 실패했습니다",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
    }
  };

  return (
    <Area>
      <Spacer height={"50px"} />

      <Content>
        <Flex justifyContent={"center"} style={{}}>
          <Text font={Fonts.Medium} size={"28px"}>
            콘텐츠 {searchParams.get("teamId") ? "수정" : "생성"}
          </Text>
        </Flex>

        <Spacer height={"30px"} />

        <Flex
          flexDirection={"column"}
          style={{
            border: `1px solid ${colorSet.lineGray}`,
            padding: "20px",
          }}
        >
          <Grid gridTemplateColumns={"100px 1fr"} gap={"16px 20px"}>
            <Text
              color={colorSet.textWhite}
              font={Fonts.Medium}
              textAlign={"center"}
              style={{
                padding: "6px 10px",
                backgroundColor: colorSet.primary,
                borderRadius: "3px",
              }}
            >
              분류
            </Text>

            <Flex>
              <select
                value={divison}
                onChange={(e) => {
                  setDivision(e.target.value as Division);
                }}
                style={{
                  border: `1px solid ${colorSet.lineGray}`,
                  borderRadius: "10px",
                  padding: "8px 10px",
                }}
              >
                <option value="">--선택해주세요--</option>
                {[
                  ...SingTabs,
                  ...PlayTabs,
                  ...PerformanceTabs,
                  ...DanceTabs,
                  ...MCTabs,
                  ...CelebrityTabs,
                  ...PartyTabs,
                ].map((tab) => (
                  <option value={tab.division} key={tab.division}>
                    {tab.text}
                  </option>
                ))}
              </select>
            </Flex>

            <Text
              color={colorSet.textWhite}
              font={Fonts.Medium}
              textAlign={"center"}
              style={{
                padding: "6px 10px",
                backgroundColor: colorSet.primary,
                borderRadius: "3px",
              }}
            >
              팀명
            </Text>
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder={"팀명을 입력하세요"}
              style={{
                border: `1px solid ${colorSet.lineGray}`,
                borderRadius: "10px",
              }}
            />
            <Text
              color={colorSet.textWhite}
              font={Fonts.Medium}
              textAlign={"center"}
              style={{
                padding: "6px 10px",
                backgroundColor: colorSet.primary,
                borderRadius: "3px",
              }}
            >
              간단 소개글
            </Text>
            <Input
              value={shortIntro}
              onChange={(e) => {
                setShortIntro(e.target.value);
              }}
              placeholder={"간단 소개글을 입력하세요"}
              style={{
                border: `1px solid ${colorSet.lineGray}`,
                borderRadius: "10px",
              }}
            />
            <Text
              color={colorSet.textWhite}
              font={Fonts.Medium}
              textAlign={"center"}
              style={{
                padding: "6px 10px",
                backgroundColor: colorSet.primary,
                borderRadius: "3px",
              }}
            >
              팀원 수
            </Text>
            <Input
              value={teamMany}
              type={"number"}
              onChange={(e) => {
                setTeamMany(Number(e.target.value) || 0);
              }}
              placeholder={"팀원 수를 입력하세요"}
              style={{
                border: `1px solid ${colorSet.lineGray}`,
                borderRadius: "10px",
              }}
            />
          </Grid>
          <Spacer height={"10px"} />
          <Text font={Fonts.Medium}>소개</Text>
          <Spacer height={"5px"} />
          <TextArea
            value={longIntro}
            onChange={(e) => {
              setLongIntro(e.target.value);
            }}
            placeholder={"소개를 입력하세요"}
            rows={4}
            style={{
              border: `1px solid ${colorSet.lineGray}`,
              borderRadius: "10px",
              padding: "8px 10px",
              resize: "none",
            }}
          />

          <Spacer height={"10px"} />

          <Text font={Fonts.Medium}>포트폴리오</Text>
          <Spacer height={"5px"} />
          <TextArea
            value={portfolio}
            onChange={(e) => {
              setPortfolio(e.target.value);
            }}
            placeholder={"포트폴리오를 입력하세요"}
            rows={10}
            style={{
              border: `1px solid ${colorSet.lineGray}`,
              borderRadius: "10px",
              padding: "8px 10px",
              resize: "none",
            }}
          />

          <Spacer height={"10px"} />

          <Text font={Fonts.Medium}>레파토리</Text>

          <Spacer height={"5px"} />

          <TextArea
            value={repertoire}
            onChange={(e) => {
              setRepertoire(e.target.value);
            }}
            placeholder={"레파토리를 입력하세요"}
            rows={4}
            style={{
              border: `1px solid ${colorSet.lineGray}`,
              borderRadius: "10px",
              padding: "8px 10px",
              resize: "none",
            }}
          />

          <Spacer height={"10px"} />

          <Text font={Fonts.Medium}>요청장비</Text>

          <Spacer height={"5px"} />

          <TextArea
            value={equipment}
            onChange={(e) => {
              setEquipment(e.target.value);
            }}
            placeholder={"요청장비를 입력하세요"}
            rows={4}
            style={{
              border: `1px solid ${colorSet.lineGray}`,
              borderRadius: "10px",
              padding: "8px 10px",
              resize: "none",
            }}
          />

          <Spacer height={"20px"} />

          <Flex justifyContent={"end"}>
            <Button
              backgroundColor={colorSet.primary}
              width={"185px"}
              onClick={handleSubmit}
              style={{
                borderRadius: "25px",
                padding: "10px 20px",
              }}
            >
              <Text font={Fonts.Bold} color={colorSet.textWhite}>
                업로드하기
              </Text>
            </Button>
          </Flex>
        </Flex>

        <Spacer height={"20px"} />
      </Content>
    </Area>
  );
};

export default ContentCreate;
