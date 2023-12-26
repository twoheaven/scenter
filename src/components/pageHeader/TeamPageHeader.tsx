import { Divider, Spacer } from "@dohyun-ko/react-atoms";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useIsMobile from "@/hooks/useIsMobile";
import {
  activeSubTabAtom,
  activeTabAtom,
  divisionAtom,
  TeamTabs,
} from "@/store";
import Paths from "@/types/paths";

import PageHeader from "./PageHeader";

interface TeamPageHeaderProps {}

const TeamPageHeader = ({}: TeamPageHeaderProps) => {
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);
  const [activeSubTab, setActiveSubTab] = useAtom(activeSubTabAtom);
  const [, setDivision] = useAtom(divisionAtom);

  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab.subTabs?.includes(activeSubTab)) return;
    activeTab.subTabs && setActiveSubTab(activeTab.subTabs[0]);
  }, [activeSubTab, activeTab, setActiveSubTab]);

  useEffect(() => {
    activeSubTab.division && setDivision(activeSubTab.division);

    const isCelebTab = TeamTabs.some((tab) => tab.name === activeTab.name);
    if (!isCelebTab) {
      setActiveTab(TeamTabs[0]);
    }
  }, [activeSubTab, setDivision]);

  const isMobile = useIsMobile();

  return (
    <PageHeader>
      <PageHeader.Title text={"공연팀"} />
      <Spacer height={isMobile ? "20px" : "30px"} />
      <PageHeader.Tabs
        tabs={TeamTabs}
        activeTab={activeTab}
        onClickTab={(tab) => {
          navigate(Paths.Teams);
          setActiveTab(tab);
        }}
      />
      <Spacer height={"40px"} />
      <PageHeader.SubTabs
        tabs={activeTab.subTabs || []}
        activeTab={activeSubTab}
        onClickTab={(tab) => {
          navigate(Paths.Teams);
          setActiveSubTab(tab);
        }}
      />
      <Spacer height={isMobile ? "30px" : "50px"} />
      <Divider />
    </PageHeader>
  );
};

export default TeamPageHeader;
