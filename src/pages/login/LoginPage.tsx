import {
  Area,
  Button,
  Content,
  Flex,
  Input,
  Spacer,
  Text,
} from "@dohyun-ko/react-atoms";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { postLogin } from "@/apis/auth-api";
import colorSet from "@/styles/color-set";
import Fonts from "@/styles/fonts";
import Paths from "@/types/paths";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = useMutation(postLogin);

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login.mutate(
      {
        username,
        password,
      },
      {
        onSuccess: () => {
          navigate(Paths.Main);
        },
        onError: () => {
          toast.error("로그인에 실패했습니다.");
        },
      },
    );
  };

  return (
    <Area>
      <Content>
        <form onSubmit={handleLogin}>
          <Flex justifyContent={"center"}>
            <Spacer height={"100px"} />

            <Text font={Fonts.Medium} size={"28px"}>
              로그인
            </Text>

            <Spacer height={"30px"} />

            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={"아이디"}
              style={{
                border: `1px solid ${colorSet.lineGray}`,
              }}
            />

            <Spacer height={"10px"} />

            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={"password"}
              placeholder={"비밀번호"}
              style={{
                border: `1px solid ${colorSet.lineGray}`,
              }}
            />

            <Spacer height={"15px"} />

            <Button
              backgroundColor={colorSet.primary}
              style={{
                padding: "8px 20px",
                borderRadius: "6px",
              }}
            >
              <Text>로그인</Text>
            </Button>
          </Flex>

          <Spacer height={"100px"} />
        </form>
      </Content>
    </Area>
  );
};

export default LoginPage;
