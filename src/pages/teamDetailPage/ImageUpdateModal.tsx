import {
  Button,
  Circle,
  Content,
  Flex,
  Grid,
  Spacer,
  Text,
} from "@dohyun-ko/react-atoms"; // 필요한 리액트 컴포넌트 가져오기
import { useMutation, useQueryClient } from "@tanstack/react-query"; // 변이 및 쿼리 관련 훅 가져오기
import { useAtom } from "jotai"; // 상태 관리를 위한 jotai 훅 가져오기
import { useState } from "react"; // 리액트 상태 훅 가져오기
import { toast } from "react-toastify"; // 토스트 알림 라이브러리 가져오기

import {
  deleteSubPicture,
  postMainPicture,
  postSubPicture,
  putMainPicture,
} from "@/apis/text-api"; // API 함수 가져오기
import ModalContainer from "@/components/modalContainer/ModalContainer"; // 모달 컨테이너 컴포넌트 가져오기
import { modalListAtom } from "@/store"; // 모달 상태를 관리하는 상태 원자 가져오기
import colorSet from "@/styles/color-set"; // 색상 설정 가져오기
import Fonts from "@/styles/fonts"; // 폰트 설정 가져오기
import { Team } from "@/types/interfaces"; // 팀 인터페이스 가져오기
import QueryKeys from "@/types/queryKeys"; // 쿼리 키 가져오기

// 이미지 업데이트 모달 컴포넌트 정의
interface ImageUpdateModalProps {
  team: Team; // 팀 데이터를 속성으로 받음
}

const ImageUpdateModal = ({ team }: ImageUpdateModalProps) => {
  // 메인 이미지와 세부 이미지 상태 변수 정의
  const [mainImage, setMainImage] = useState<File>();
  const [subImages, setSubImages] = useState<File[]>([]);

  // 모달 리스트 상태 원자와 관련된 훅 가져오기
  const [, setModalList] = useAtom(modalListAtom);

  // 이미지 업데이트를 위한 변이 함수들 가져오기
  const createMainImage = useMutation(postMainPicture);
  const updateMainImage = useMutation(putMainPicture);
  const createSubImage = useMutation(postSubPicture);
  const deleteSubImage = useMutation(deleteSubPicture);

  // 모달 닫기 함수 정의
  const onClose = () => {
    setModalList((prev) => prev.slice(0, -1)); // 모달 리스트에서 현재 모달 삭제
  };

  // 쿼리 클라이언트 가져오기
  const queryClient = useQueryClient();

  // 메인 이미지 제출 처리 함수 정의
  const handleMainImageSubmit = () => {
    // 메인 이미지가 선택되었는지 확인
    if (!mainImage) {
      return;
    }

    // 팀에 메인 이미지가 있는지 확인
    if (team.mainPicture) {
      // 메인 이미지가 있는 경우 업데이트 변이 실행
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
      // 메인 이미지가 없는 경우 생성 변이 실행
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

  // 세부 이미지 제출 처리 함수 정의
  const handleSubImagesSubmit = () => {
    // 세부 이미지가 선택되었는지 확인
    if (!subImages.length) {
      return;
    }

    // 모든 세부 이미지에 대해 생성 변이 실행
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

  // 세부 이미지 삭제 처리 함수 정의
  const handleSubImageDelete = (subImageId: number) => {
    // 삭제 변이 실행
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
          {/* 팀의 세부 이미지들을 반복하여 출력 */}
          {team.subPictures?.map((subPicture) => (
            <Flex
              style={{
                position: "relative",
              }}
              key={subPicture.id}
            >
              <img src={subPicture.storedFilePath} alt={"sub"} width={"20%"} />

              {/* 세부 이미지 삭제 버튼 */}
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

export default ImageUpdateModal; // 이미지 업데이트 모달 컴포넌트를 내보냅니다.
