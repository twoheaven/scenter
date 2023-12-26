import { Divider, Spacer } from "@dohyun-ko/react-atoms";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useIsMobile from "@/hooks/useIsMobile";
import { activeTabAtom, divisionAtom, PartyTabs } from "@/store";
import Paths from "@/types/paths";

import PageHeader from "./PageHeader";

interface PartyPageHeaderProps {}

const PartyPageHeader = ({}: PartyPageHeaderProps) => {
  const isMobile = useIsMobile();

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
    const isPartyTab = PartyTabs.some((tab) => tab.name === activeTab.name);
    if (!isPartyTab) {
      setActiveTab(PartyTabs[0]);
    }
  }, [activeTab, setDivision]);

  return (
    <PageHeader>
      <PageHeader.Title text={"파티"} />

      <Spacer height={isMobile ? "30px" : "50px"} />

      <PageHeader.Tabs
        tabs={PartyTabs}
        activeTab={activeTab}
        onClickTab={(tab) => {
          navigate(Paths.Party);
          setActiveTab(tab); // 클릭 이벤트는 비어있는 함수로 설정합니다.
        }}
        gap={isMobile ? "5px" : "10px"}
      />
      {/* Spacer 컴포넌트를 사용하여 간격을 조절합니다. */}
      <Spacer height={isMobile ? "30px" : "50px"} />
      <Divider />
    </PageHeader>
  );
};

export default PartyPageHeader;
