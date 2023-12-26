import {
  Button,
  Circle,
  Content,
  Flex,
  Grid,
  Spacer,
  Text,
} from "@dohyun-ko/react-atoms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useState } from "react";
import { toast } from "react-toastify";

import {
  deleteSubPicture,
  postMainPicture,
  postSubPicture,
  putMainPicture,
} from "@/apis/text-api";
import ModalContainer from "@/components/modalContainer/ModalContainer";
import { modalListAtom } from "@/store";
import colorSet from "@/styles/color-set";
import Fonts from "@/styles/fonts";
import { Team } from "@/types/interfaces";
import QueryKeys from "@/types/queryKeys";

interface ImageUpdateModalProps {
  team: Team;
}

const ImageUpdateModal = ({ team }: ImageUpdateModalProps) => {
  const [mainImage, setMainImage] = useState<File>();
  const [subImages, setSubImages] = useState<File[]>([]);

  const [, setModalList] = useAtom(modalListAtom);

  const createMainImage = useMutation(postMainPicture);
  const updateMainImage = useMutation(putMainPicture);
  const createSubImage = useMutation(postSubPicture);
  const deleteSubImage = useMutation(deleteSubPicture);

  const onClose = () => {
    setModalList((prev) => prev.slice(0, -1));
  };

  const queryClient = useQueryClient();

  const handleMainImageSubmit = () => {
    if (!mainImage) {
      return;
    }

    if (team.mainPicture) {
      updateMainImage.mutate(
        {
          id: team.id,
          image: mainImage,
        },
        {
          onSuccess: () => {
            toast.success("메인 이미지가 수정되었습니다");
            queryClient.invalidateQueries([QueryKeys.getText]);
            onClose();
          },
          onError: () => {
            toast.error("메인 이미지 수정에 실패했습니다");
          },
        },
      );
    } else {
      createMainImage.mutate(
        {
          id: team.id,
          image: mainImage,
        },
        {
          onSuccess: () => {
            toast.success("메인 이미지가 수정되었습니다");
            queryClient.invalidateQueries([QueryKeys.getText]);
            onClose();
          },
          onError: () => {
            toast.error("메인 이미지 수정에 실패했습니다");
          },
        },
      );
    }
  };

  const handleSubImagesSubmit = () => {
    if (!subImages.length) {
      return;
    }

    subImages.forEach((subImage) => {
      createSubImage.mutate(
        {
          id: team.id,
          image: subImage,
        },
        {
          onSuccess: () => {
            toast.success("세부 이미지가 수정되었습니다");
            queryClient.invalidateQueries([QueryKeys.getText]);
            onClose();
          },
          onError: () => {
            toast.error("세부 이미지 수정에 실패했습니다");
          },
        },
      );
    });
  };

  const handleSubImageDelete = (subImageId: number) => {
    deleteSubImage.mutate(
      {
        id: team.id,
        subPictureId: subImageId,
      },
      {
        onSuccess: () => {
          toast.success("세부 이미지가 삭제되었습니다");
          queryClient.invalidateQueries([QueryKeys.getText]);
        },
        onError: () => {
          toast.error("세부 이미지 삭제에 실패했습니다");
        },
      },
    );
  };

  return (
    <ModalContainer onClick={(evt) => evt.stopPropagation()}>
      <Content width={"60vw"}>
        <Text>메인 이미지 수정</Text>

        <Text font={Fonts.Medium}>메인 사진</Text>

        {team.mainPicture && <img alt={"main"} width={"20%"} />}

        <Spacer height={"5px"} />

        <Flex>
          <input
            type={"file"}
            accept={"image/jpg, image/jpeg, image/png, image/gif, image/webp"}
            onChange={(e) => {
              setMainImage(e.target.files?.[0]);
            }}
          />

          <Button
            backgroundColor={colorSet.primary}
            style={{
              padding: "3px 6px",
              borderRadius: "3px",
            }}
            onClick={handleMainImageSubmit}
          >
            <Text>수정</Text>
          </Button>
        </Flex>

        <Spacer height={"10px"} />

        <Flex gap={"10px"}>
          <Text font={Fonts.Medium}>세부 사진</Text>
          <Text font={Fonts.Medium} color={colorSet.textLight}>
            여러장을 선택할 수 있어요
          </Text>
        </Flex>

        <Spacer height={"5px"} />

        <Grid gridTemplateColumns={"1fr 1fr 1fr"}>
          {team.subPictures?.map((subPicture) => (
            <Flex
              style={{
                position: "relative",
              }}
              key={subPicture.id}
            >
              <img src={subPicture.storedFilePath} alt={"sub"} width={"20%"} />

              <Button
                onClick={() => {
                  handleSubImageDelete(subPicture.id);
                }}
              >
                <Circle backgroundColor={"red"} diameter={"10px"} />
              </Button>
            </Flex>
          ))}
        </Grid>

        <Flex>
          <input
            type={"file"}
            accept={"image/jpg, image/jpeg, image/png, image/gif, image/webp"}
            multiple
            onChange={(e) => {
              setSubImages(Array.from(e.target.files || []));
            }}
          />

          <Button
            backgroundColor={colorSet.primary}
            style={{
              padding: "3px 6px",
              borderRadius: "3px",
            }}
            onClick={handleSubImagesSubmit}
          >
            <Text>수정</Text>
          </Button>
        </Flex>

        <Spacer height={"10px"} />
      </Content>
    </ModalContainer>
  );
};

export default ImageUpdateModal;
