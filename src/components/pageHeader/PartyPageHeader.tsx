import { Divider, Spacer } from "@dohyun-ko/react-atoms";
import { useAtom } from "jotai";

import useIsMobile from "@/hooks/useIsMobile";
import { activeTabAtom, PartyTabs } from "@/store";

import PageHeader from "./PageHeader";

const PartyPageHeader = () => {
  const isMobile = useIsMobile();

  // Jotai에서 상태를 가져와서 사용합니다.
  const [activeTab] = useAtom(activeTabAtom);

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
