import { Spacer } from "@dohyun-ko/react-atoms";

import BannerSection from "./banner/BannerSection";
import Category from "./category/Category";
import Field from "./field/Field";
import RecommendSection from "./recommend/RecommendSection";
import RecruitSection from "./recruit/RecruitSection";

interface MainPageProps {}

const MainPage = ({}: MainPageProps) => {
  return (
    <>
      <BannerSection />

      <Spacer
        height={"30px"}
        style={{
          flexGrow: 0,
        }}
      />

      <Spacer height={"32px"} />

      <Category />

      <Spacer height={"80px"} />

      <RecommendSection />

      <Spacer height={"50px"} />

      <RecruitSection />

      <Field />

      <Spacer height={"50px"} />
    </>
  );
};

export default MainPage;
