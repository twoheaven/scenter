import {
  Area,
  Content,
  Flex,
  Grid,
  Highlight,
  Spacer,
  Text,
} from "@dohyun-ko/react-atoms";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { deleteField, getFields, postField } from "@/apis/field-api";
import useIsMobile from "@/hooks/useIsMobile";
import colorSet from "@/styles/color-set";
import Fonts from "@/styles/fonts";
import QueryKeys from "@/types/queryKeys";

import FieldCard from "./FieldCard";

// Field 컴포넌트의 프로퍼티 정의
interface FieldProps {}

// Field 컴포넌트 정의
const Field = ({}: FieldProps) => {
  const useisMobile = useIsMobile();

  // 필드 데이터를 가져오기 위한 React Query 훅 사용
  const { data } = useQuery([QueryKeys.getFields], getFields);
  // 필드의 컬럼을 동적으로 변경하기 위한 상태
  const [title, settitle] = useState<string>("");
  const [date, setdate] = useState<string>("");
  const [location, setlocation] = useState<string>("");
  const [casting, setcasting] = useState<string>("");
  // 새로운 필드 이미지를 저장하는 상태
  const [newFieldImage, setNewFieldImage] = useState<File>();
  // 새로운 필드 컬럼을 저장하는 상태
  const [newFieldtitle, setNewFieldtitle] = useState<string>("");
  const [newFielddate, setNewFielddate] = useState<string>("");
  const [newFieldlocation, setNewFieldlocation] = useState<string>("");
  const [newFieldcasting, setNewFieldcasting] = useState<string>("");
  // 모바일 환경 여부를 확인하는 커스텀 훅 사용
  const isMobile = useIsMobile();
  // React Query의 Query Client 인스턴스 생성
  const queryClient = useQueryClient();

  // 배너 생성 및 삭제에 사용되는 React Query Mutation 훅들 생성
  const createField = useMutation(postField);
  const deleteFieldMutation = useMutation(deleteField);
  // JSX 반환
  return (
    <Area>
      <Content>
        <Flex
          justifyContent={"center"}
          style={{
            position: "relative",
          }}
        >
          <Text size={isMobile ? "1.5rem" : "1.875rem"}>
            현장{" "}
            <Highlight
              color={colorSet.text}
              style={{
                fontFamily: Fonts.Bold,
              }}
            >
              스케치
            </Highlight>
          </Text>
        </Flex>
        <Flex justifyContent="center" width={"100%"}>
          <Grid // 그리드의 열을 3개로 구성합니다.
            gridTemplateColumns={isMobile ? "1fr 1fr" : "1fr 1fr 1fr 1fr"}
            gap={isMobile ? "3px" : "3px"}
          >
            <FieldCard />
            <FieldCard />
            <FieldCard />
            <FieldCard />
          </Grid>
          <Spacer height={"10px"} />
        </Flex>
      </Content>
    </Area>
  );
};

export default Field;
