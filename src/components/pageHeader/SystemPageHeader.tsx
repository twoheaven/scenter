import { Divider, Spacer } from "@dohyun-ko/react-atoms";

import useIsMobile from "@/hooks/useIsMobile";

import PageHeader from "./PageHeader";

const SystemPageHeader = () => {
  // 화면 크기에 따라 모바일 여부를 판별합니다.
  const isMobile = useIsMobile();

  return (
    // 시스템 페이지에 해당하는 헤더 컴포넌트입니다.
    <PageHeader>
      {/* 페이지 헤더의 제목을 설정합니다. */}
      <PageHeader.Title text={"시스템"} />

      {/* Spacer 컴포넌트를 사용하여 간격을 조절합니다. */}
      <Spacer height={isMobile ? "30px" : "50px"} />

      {/* Divider 컴포넌트를 사용하여 구분선을 추가합니다. */}
      <Divider />
    </PageHeader>
  );
};

export default SystemPageHeader;
