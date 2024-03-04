import { Divider, Spacer } from "@dohyun-ko/react-atoms";

import useIsMobile from "@/hooks/useIsMobile";

import BannerSection from "./banner/BannerSection";
import Category from "./category/Category";
import FieldSection from "./field/FieldSection";
import RecommendSection from "./recommend/RecommendSection";
import RecruitSection from "./recruit/RecruitSection";

const MainPage = () => {
  const isMobile = useIsMobile();
  return (
    <>
      <BannerSection />

      <Spacer
        height={"20px"}
        style={{
          flexGrow: 0,
        }}
      />

      <Category />

      <Spacer height={"20px"} />

      <Divider />

      <Spacer height={isMobile ? "30px" : "80px"} />

      <RecommendSection />

      <Spacer height={"50px"} />

      <RecruitSection />

      <FieldSection />

      <Spacer height={"50px"} />
    </>
  );
};

export default MainPage;
