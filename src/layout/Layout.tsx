// 토스트 알림에 사용되는 스타일을 불러옵니다.
import "react-toastify/dist/ReactToastify.css";

// 외부 라이브러리 및 모듈에서 필요한 컴포넌트 및 유틸리티를 불러옵니다.
import { Flex, MyThemeProvider } from "@dohyun-ko/react-atoms";
import { useAtom } from "jotai";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import colorSet from "src/styles/color-set";
import styled, { keyframes } from "styled-components";

// 애플리케이션에서 사용되는 커스텀 훅 및 상태를 불러옵니다.
import useIsMobile from "@/hooks/useIsMobile";
import { modalListAtom } from "@/store";

// 레이아웃 구조를 위한 컴포넌트를 불러오고 사용합니다.
import Footer from "./Footer";
import Header from "./Header";
import Header2 from "./Header2";
import MobileHeader from "./MobileHeader";
import MobileHeader2 from "./MobileHeader2 ";
import MobileProvider from "./MobileProvider";

// 페이드 인 애니메이션을 위한 키프레임 정의
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// 모달 배경의 컴포넌트 속성을 위한 인터페이스
interface ModalBackdropProps {
  children?: React.ReactNode;
}

// 페이드 인 애니메이션을 적용한 모달 배경의 스타일드 컴포넌트
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

// 메인 레이아웃 컴포넌트
const Layout = () => {
  // jotai 상태 관리를 사용하여 모달 목록을 관리하는 상태
  const [modalList, setModalList] = useAtom(modalListAtom);

  return (
    // 색상 세트를 사용한 테마 프로바이더
    <MyThemeProvider
      theme={{
        ...colorSet,
      }}
    >
      {/* 모바일 특정 기능을 처리하기 위한 모바일 프로바이더 */}
      <MobileProvider>
        {/* 전체 레이아웃을 위한 주요 플렉스 컨테이너 */}
        <Flex
          flexDirection={"column"}
          style={{
            minHeight: "100vh",
          }}
        >
          {/* 모바일 여부에 따라 헤더를 조건부 렌더링 */}
          <HeaderWrapper />
          <Header2Wrapper />

          {/* 중첩된 라우트를 렌더링하기 위한 아웃렛 */}
          <Outlet />

          {/* 푸터 컴포넌트 */}
          <Footer />

          {/* modalList 상태를 기반으로 모달과 배경을 렌더링 */}
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

          {/* 토스트 알림을 표시하기 위한 토스트 컨테이너 */}
          <ToastContainer />
        </Flex>
      </MobileProvider>
    </MyThemeProvider>
  );
};

// 모바일과 데스크톱 헤더 중 어떤 것을 선택할지 결정하는 컴포넌트
const HeaderWrapper = () => {
  const isMobile = useIsMobile();

  return isMobile ? <MobileHeader /> : <Header />;
};

// 모바일과 데스크톱 헤더 중 어떤 것을 선택할지 결정하는 컴포넌트
const Header2Wrapper = () => {
  const isMobile = useIsMobile();

  return isMobile ? <MobileHeader2 /> : <Header2 />;
};

// 메인 레이아웃 컴포넌트를 기본 내보내기로 설정
export default Layout;
