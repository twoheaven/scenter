import { Divider, Spacer } from "@dohyun-ko/react-atoms";

import useIsMobile from "@/hooks/useIsMobile";

import PageHeader from "./PageHeader";

interface EventPageHeaderProps {}

const EventPageHeader = ({}: EventPageHeaderProps) => {
  const isMobile = useIsMobile();

  return (
    <PageHeader>
      <PageHeader.Title text={"행사"} />

      <Spacer height={isMobile ? "30px" : "50px"} />

      <Divider />
    </PageHeader>
  );
};

export default EventPageHeader;
