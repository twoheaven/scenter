import { Divider, Spacer } from "@dohyun-ko/react-atoms";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useIsMobile from "@/hooks/useIsMobile";
import { activeTabAtom, CelebrityTabs, divisionAtom } from "@/store";
import Paths from "@/types/paths";

import PageHeader from "./PageHeader";

const CelebrityPageHeader = () => {
  // Jotai에서 상태를 가져와서 사용합니다.
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);
  const [, setDivision] = useAtom(divisionAtom);

  // react-router의 useNavigate 훅을 사용하여 페이지 이동을 처리합니다.
  const navigate = useNavigate();

  // useEffect를 사용하여 컴포넌트가 마운트되거나 업데이트될 때의 동작을 정의합니다.
  useEffect(() => {
    // 현재 활성 탭의 division이 존재한다면 division 상태를 업데이트합니다.
    activeTab.division && setDivision(activeTab.division);

    // 현재 활성 탭이 CelebrityTabs에 속하지 않으면 첫 번째 탭을 활성화합니다.
    const isCelebTab = CelebrityTabs.some((tab) => tab.name === activeTab.name);
    if (!isCelebTab) {
      setActiveTab(CelebrityTabs[0]);
    }
  }, [activeTab, setActiveTab, setDivision]);

  // 화면 크기에 따라 모바일 여부를 판별합니다.
  const isMobile = useIsMobile();

  return (
    // 연예인 페이지에 해당하는 헤더 컴포넌트입니다.
    <PageHeader>
      {/* 페이지 헤더의 제목을 설정합니다. */}
      <PageHeader.Title text={"연예인"} />

      {/* Spacer 컴포넌트를 사용하여 간격을 조절합니다. */}
      <Spacer height={isMobile ? "20px" : "30px"} />

      {/* PageHeader.Tabs 컴포넌트를 사용하여 탭을 표시합니다.
           탭을 클릭하면 해당 탭으로 이동하고, setActiveTab을 통해 상태를 업데이트합니다. */}
      <PageHeader.Tabs
        tabs={CelebrityTabs}
        activeTab={activeTab}
        onClickTab={(tab) => {
          navigate(Paths.Celebrities); // 탭 클릭 시 연예인 페이지로 이동합니다.
          setActiveTab(tab); // 클릭한 탭을 활성화합니다.
        }}
        gap={isMobile ? "5px" : "10px"}
      />

      {/* Spacer 컴포넌트를 사용하여 간격을 조절합니다. */}
      <Spacer height={isMobile ? "30px" : "50px"} />

      {/* Divider 컴포넌트를 사용하여 구분선을 추가합니다. */}
      <Divider />
    </PageHeader>
  );
};

export default CelebrityPageHeader;
