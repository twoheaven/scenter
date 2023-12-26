import { Button, Flex } from "@dohyun-ko/react-atoms";
import { useRef, useState } from "react";
import styled from "styled-components";

import Icons from "@/assets/Icons";
import { defaultPicture } from "@/dummy-data";
import { Picture } from "@/types/interfaces";

interface ImageViewProps {
  images: Picture[];
}

const ImageContainer = styled.div`
  display: flex;
  gap: 5px;
  width: calc(100% - 80px);

  overflow-x: scroll;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ImageView = ({ images }: ImageViewProps) => {
  const [currentImage, setCurrentImage] = useState<Picture>(
    images[0] || defaultPicture,
  );

  const containerRef = useRef<HTMLDivElement>(null);

  const Scroll = (amount: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft + amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Flex flexDirection={"column"} gap={"5px"} width={"100%"}>
      <img
        src={currentImage?.storedFilePath}
        style={{
          width: "100%",
        }}
      />

      <Flex justifyContent={"center"} gap={"10px"} width={"100%"}>
        <Button
          onClick={() => {
            Scroll(-100);
          }}
        >
          <Icons.ArrowLeft />
        </Button>

        <ImageContainer ref={containerRef}>
          {(images.length > 0 ? images : [defaultPicture]).map((image) => (
            <Button key={image.id} onClick={() => setCurrentImage(image)}>
              <img
                src={image.storedFilePath}
                style={{
                  height: "80px",
                  aspectRatio: "1/1",
                }}
              />
            </Button>
          ))}
        </ImageContainer>
        <Button
          onClick={() => {
            Scroll(100);
          }}
        >
          <Icons.ArrowRight />
        </Button>
      </Flex>
    </Flex>
  );
};

export default ImageView;
