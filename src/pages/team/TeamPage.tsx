import { Area, Content, Grid, Spacer } from "@dohyun-ko/react-atoms";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";

import { getTexts } from "@/apis/text-api";
import TeamPageHeader from "@/components/pageHeader/TeamPageHeader";
import TeamCard from "@/components/teamCard/TeamCard";
import useIsMobile from "@/hooks/useIsMobile";
import { divisionAtom } from "@/store";
import QueryKeys from "@/types/queryKeys";
import { divideTexts } from "@/utils/utils";

interface TeamPageProps {}

const TeamPage = ({}: TeamPageProps) => {
  const { data } = useQuery([QueryKeys.getTexts], getTexts);
  const [division] = useAtom(divisionAtom);

  const dividedTeams = divideTexts(data?.content || [], division);

  const isMobile = useIsMobile();

  return (
    <Area>
      <Spacer height={"50px"} />

      <TeamPageHeader />

      <Spacer height={"30px"} />

      {data && (
        <Content>
          <Grid gridTemplateColumns={isMobile ? "1fr" : "1fr 1fr"} gap={"20px"}>
            {dividedTeams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </Grid>
        </Content>
      )}

      <Spacer height={"100px"} />
    </Area>
  );
};

export default TeamPage;
