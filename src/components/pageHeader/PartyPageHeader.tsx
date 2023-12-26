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

  return (
    <PageHeader>
      <PageHeader.Title text={"파티"} />

      <Spacer height={isMobile ? "30px" : "50px"} />

      <PageHeader.Tabs
        tabs={PartyTabs}
        activeTab={activeTab}
        onClickTab={() => {
          return;
        }}
        gap={isMobile ? "5px" : "10px"}
        disabled
      />
      {/* Spacer 컴포넌트를 사용하여 간격을 조절합니다. */}
      <Spacer height={isMobile ? "30px" : "50px"} />
      <Divider />
    </PageHeader>
  );
};

export default PartyPageHeader;
