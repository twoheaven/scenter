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
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { postEmail } from "@/apis/email-api";
import useIsMobile from "@/hooks/useIsMobile";
import colorSet from "@/styles/color-set";
import Fonts from "@/styles/fonts";
import Paths from "@/types/paths";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const sendEmail = useMutation(postEmail, {
    onError: () => {
      toast.error("문의하기에 실패했습니다. 다시 시도해주세요.");
    },
    onSuccess: () => {
      toast.success("문의가 전송되었습니다.");
      setName("");
      setPhone("");
      setContent("");
      navigate(Paths.Main);
    },
  });

  const handleSendEmail = () => {
    if (!name) {
      toast.warn("성함을 입력해주세요");
      return;
    }

    if (!phone) {
      toast.warn("연락처를 입력해주세요");
      return;
    }

    if (!/^\d{2,3}-?\d{3,4}-?\d{4}$/.test(phone)) {
      toast.warn("연락처를 정확히 입력해주세요");
      return;
    }

    if (!content) {
      toast.warn("문의사항을 입력해주세요");
      return;
    }

    sendEmail.mutate({
      subject: `문의: ${name} / ${phone}`,
      text: content,
    });
  };

  const isMobile = useIsMobile();

  return (
    <Area>
      <Spacer height={"50px"} />

      <Content>
        <Flex justifyContent={"center"}>
          <Text
            as="h1"
            size={isMobile ? "1.375rem" : "1.75rem"}
            font={Fonts.Medium}
          >
            문의하기
          </Text>
        </Flex>

        <Spacer height={"30px"} />

        <Flex
          flexDirection={"column"}
          style={{
            border: `1px solid ${colorSet.lineGray}`,
            padding: isMobile ? "12px" : "20px",
          }}
        >
          <Text font={Fonts.Medium}>문의자 정보</Text>

          <Spacer height={"20px"} />

          <Grid
            gridTemplateColumns={"60px 1fr"}
            gap={isMobile ? "12px 8px" : "16px 12px"}
          >
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
              성함
            </Text>
            <Input
              width={"calc(100% - 20px)"}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder={"성함을 입력하세요"}
              style={{
                border: `1px solid ${colorSet.lineGray}`,
                borderRadius: "10px",
                fontSize: isMobile ? "0.875rem" : "1rem",
              }}
            />
            <Text
              color={colorSet.textWhite}
              font={Fonts.Medium}
              style={{
                padding: "6px 10px",
                backgroundColor: colorSet.primary,
                borderRadius: "3px",
              }}
            >
              연락처
            </Text>
            <Input
              width={"calc(100% - 20px)"}
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              placeholder={"연락처를 입력하세요 예) 01012345678"}
              style={{
                border: `1px solid ${colorSet.lineGray}`,
                borderRadius: "10px",
                fontSize: isMobile ? "0.875rem" : "1rem",
                flexGrow: 1,
              }}
            />
          </Grid>

          <Spacer height={"10px"} />

          <Text font={Fonts.Medium}>문의사항</Text>

          <Spacer height={"5px"} />

          <TextArea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            placeholder={"문의하실 내용을 입력하세요"}
            rows={10}
            style={{
              border: `1px solid ${colorSet.lineGray}`,
              borderRadius: "10px",
              padding: "8px 10px",
              resize: "none",
              fontSize: isMobile ? "0.875rem" : "1rem",
              flexGrow: 1,
              width: "calc(100% - 20px)",
            }}
          />

          <Spacer height={"20px"} />

          <Flex justifyContent={"end"}>
            <Button
              backgroundColor={colorSet.primary}
              width={isMobile ? "100px" : "185px"}
              onClick={handleSendEmail}
              style={{
                borderRadius: "25px",
                padding: isMobile ? "8px 16px" : "10px 20px",
              }}
            >
              <Text font={Fonts.Medium} color={colorSet.textWhite}>
                문의하기
              </Text>
            </Button>
          </Flex>
        </Flex>

        <Spacer height={"20px"} />
      </Content>
    </Area>
  );
};

export default ContactPage;
