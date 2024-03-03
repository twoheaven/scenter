import {
  Area,
  Button,
  Content,
  Flex,
  Grid,
  Input,
  Spacer,
  Text,
} from "@dohyun-ko/react-atoms";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { getField, putField } from "@/apis/field-api";
import colorSet from "@/styles/color-set";
import Fonts from "@/styles/fonts";
import Paths from "@/types/paths";
import QueryKeys from "@/types/queryKeys";

const ContentCreate = () => {
  const [searchParams] = useSearchParams();
  const { data } = useQuery(
    [
      QueryKeys.getField,
      {
        id: Number(searchParams.get("fieldId")),
      },
    ],
    getField,
    {
      enabled: !!Number(searchParams.get("fieldId")),
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchIntervalInBackground: false,
    },
  );

  const [fieldImage, setFieldImage] = useState<File>(new File([], ""));
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [casting, setCasting] = useState("");

  useEffect(() => {
    if (data) {
      setLocation(data.location);
      setLocation(data.title);
      setLocation(data.casting);
      setLocation(data.date);
    }
  }, [data]);

  const updateField = useMutation(putField);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!title) {
      toast.warn("제목을 작성해주세요");
      return;
    }
    if (!date) {
      toast.warn("날짜를 작성해주세요");
      return;
    }
    if (!location) {
      toast.warn("장소를 작성해주세요");
      return;
    }
    if (!casting) {
      toast.warn("출연진을 작성해주세요");
      return;
    }
    const field = {
      image: fieldImage,
      title: title || "",
      date: date || "",
      location: location || "",
      casting: casting || "",
    };

    Swal.fire({
      text: "콘텐츠 생성 중입니다",
      icon: "info",
      showConfirmButton: false,
    });

    if (searchParams.get("fieldId")) {
      updateField.mutate(
        {
          id: Number(searchParams.get("fieldId")),
          ...field,
          file: fieldImage,
        },
        {
          onSuccess: () => {
            navigate(Paths.Main);
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
    }
  };

  return (
    <Area>
      <Spacer height={"50px"} />

      <Content>
        <Flex justifyContent={"center"} style={{}}>
          <Text font={Fonts.Medium} size={"28px"}>
            콘텐츠 {"수정"}
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
              제목
            </Text>

            <Flex>
              <Input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder={"제목을 입력하세요"}
                style={{
                  border: `1px solid ${colorSet.lineGray}`,
                  borderRadius: "10px",
                }}
              />
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
              날짜
            </Text>
            <Input
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              placeholder={"날짜를 입력하세요"}
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
              location
            </Text>
            <Input
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              placeholder={"위치를 입력하세요"}
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
              출연진
            </Text>
            <Input
              value={casting}
              onChange={(e) => {
                setCasting(e.target.value);
              }}
              placeholder={"출연진을 입력하세요"}
              style={{
                border: `1px solid ${colorSet.lineGray}`,
                borderRadius: "10px",
              }}
            />
          </Grid>
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
