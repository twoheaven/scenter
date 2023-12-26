import { Divider, Spacer } from "@dohyun-ko/react-atoms";

import useIsMobile from "@/hooks/useIsMobile";

import PageHeader from "./PageHeader";

interface StudyPageHeaderProps {}

const StudyPageHeader = ({}: StudyPageHeaderProps) => {
  const isMobile = useIsMobile();

  return (
    <PageHeader>
      <PageHeader.Title text={"교육"} />

      <Spacer height={isMobile ? "30px" : "50px"} />

      <Divider />
    </PageHeader>
  );
};

export default StudyPageHeader;
