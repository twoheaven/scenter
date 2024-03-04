import { Button, Flex, Spacer, Text } from "@dohyun-ko/react-atoms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

import { putFieldImage } from "@/apis/field-api";
import { apiPutter } from "@/apis/interceptor"; // 수정 필요한 부분
import colorSet from "@/styles/color-set";
import { Field } from "@/types/interfaces";
import QueryKeys from "@/types/queryKeys";

interface FieldUpdateModalProps {
  field?: Field;
}

const FieldUpdateModal = ({ field }: FieldUpdateModalProps) => {
  const [fieldImage, setFieldImage] = useState<File>();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [casting, setCasting] = useState("");

  const updateFieldImage = useMutation(putFieldImage);

  // 쿼리 클라이언트 가져오기
  const queryClient = useQueryClient();

  const updateFieldDetailsMutation = useMutation(
    (data: {
      id: number;
      title: string;
      location: string;
      date: string;
      casting: string;
    }) => apiPutter(`/api/fields/put/${field?.id}`, data),
  ); // 수정 필요한 부분

  const handleFieldImageSubmit = () => {
    if (!field || !field.id || !fieldImage) return;

    updateFieldImage.mutate(
      {
        id: field.id,
        image: fieldImage,
      },
      {
        onSuccess: () => {
          toast.success("메인 이미지가 수정되었습니다");
          queryClient.invalidateQueries([QueryKeys.getField]);
        },
        onError: () => {
          toast.error("메인 이미지 수정에 실패했습니다");
        },
      },
    );
  };

  const handleFieldDetailsSubmit = () => {
    if (!field || !field.id) return;

    const data = {
      id: field.id,
      title,
      location,
      date,
      casting,
    };

    updateFieldDetailsMutation.mutate(data, {
      onSuccess: () => {
        toast.success("내용이 수정되었습니다");
        queryClient.invalidateQueries([QueryKeys.getFields]);
      },
      onError: () => {
        toast.error("내용 수정에 실패했습니다");
      },
    });
  };

  return (
    <Flex flexDirection="column">
      <Text>이미지 수정</Text>
      {field && <img src={field.storedFilePath} width="30%" />}
      <Spacer height="5px" />
      <Flex>
        <input
          type="file"
          accept="image/jpg, image/jpeg, image/png, image/gif, image/webp"
          onChange={(e) => {
            setFieldImage(e.target.files?.[0]);
          }}
        />
        <Button
          backgroundColor={colorSet.primary}
          style={{
            padding: "3px 6px",
            borderRadius: "3px",
          }}
          onClick={handleFieldImageSubmit}
        >
          <Text>이미지수정</Text>
        </Button>
      </Flex>
      <Flex>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Casting"
          value={casting}
          onChange={(e) => setCasting(e.target.value)}
        />
        <Button
          backgroundColor={colorSet.primary}
          style={{
            padding: "3px 6px",
            borderRadius: "3px",
          }}
          onClick={handleFieldDetailsSubmit}
        >
          <Text>내용 수정</Text>
        </Button>
      </Flex>
    </Flex>
  );
};

export default FieldUpdateModal;
