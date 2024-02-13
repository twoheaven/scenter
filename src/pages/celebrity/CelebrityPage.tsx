import { Area, Content, Grid, Spacer } from "@dohyun-ko/react-atoms";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";

import { getTexts } from "@/apis/text-api";
import CelebrityCard from "@/components/celebrityCard/CelebrityCard";
import CelebrityPageHeader from "@/components/pageHeader/CelebrityPageHeader";
import useIsMobile from "@/hooks/useIsMobile";
import { activeTabAtom } from "@/store";
import { Division } from "@/types/interfaces";
import QueryKeys from "@/types/queryKeys";
import { divideTexts } from "@/utils/utils";

const CelebrityPage = () => {
  const [activeTab] = useAtom(activeTabAtom);

  const { data } = useQuery([QueryKeys.getTexts], getTexts);

  const dividedTeams = divideTexts(
    data?.content || [],
    activeTab.division || Division.CELEB_K_POP_IDOL,
  );

  const isMobile = useIsMobile();

  return (
    <Area>
      <Spacer height={"50px"} />

      <CelebrityPageHeader />

      <Spacer height={"30px"} />

      {data && (
        <Content>
          <Grid gridTemplateColumns={isMobile ? "1fr" : "1fr 1fr"} gap={"20px"}>
            {dividedTeams.map((team) => (
              <CelebrityCard key={team.id} team={team} />
            ))}
          </Grid>
        </Content>
      )}

      <Spacer height={"100px"} />
    </Area>
  );
};

export default CelebrityPage;
