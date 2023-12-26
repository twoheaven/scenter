import "react-toastify/dist/ReactToastify.css";

import { Flex, MyThemeProvider } from "@dohyun-ko/react-atoms";
import { useAtom } from "jotai";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import colorSet from "src/styles/color-set";
import styled, { keyframes } from "styled-components";

import useIsMobile from "@/hooks/useIsMobile";
import { modalListAtom } from "@/store";

import Footer from "./Footer";
import Header from "./Header";
import MobileHeader from "./MobileHeader";
import MobileProvider from "./MobileProvider";

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

interface ModalBackdropProps {
  children?: React.ReactNode;
}

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: ${(props: ModalBackdropProps) => (props.children ? "flex" : "none")};
  justify-content: center;
  align-items: center;

  z-index: 10;

  background-color: rgba(0, 0, 0, 0.28);

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;

interface LayoutProps {}

const Layout = ({}: LayoutProps) => {
  const [modalList, setModalList] = useAtom(modalListAtom);

  return (
    <MyThemeProvider
      theme={{
        ...colorSet,
      }}
    >
      <MobileProvider>
        <Flex
          flexDirection={"column"}
          style={{
            minHeight: "100vh",
          }}
        >
          <HeaderWrapper />

          <Outlet />
          <Footer />
          {modalList.map((modal, index) => (
            <ModalBackdrop
              onClick={() => setModalList([])}
              key={index}
              style={{
                zIndex: 10 + index,
              }}
            >
              {modal}
            </ModalBackdrop>
          ))}
          <ToastContainer />
        </Flex>
      </MobileProvider>
    </MyThemeProvider>
  );
};

const HeaderWrapper = () => {
  const isMobile = useIsMobile();

  return isMobile ? <MobileHeader /> : <Header />;
};

export default Layout;
