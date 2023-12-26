import {
  Area,
  Content,
  Divider,
  Flex,
  Grid,
  Spacer,
  Text,
} from "@dohyun-ko/react-atoms";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { searchTexts } from "@/apis/text-api";
import TeamCard from "@/components/teamCard/TeamCard";
import useIsMobile from "@/hooks/useIsMobile";
import colorSet from "@/styles/color-set";
import Fonts from "@/styles/fonts";
import QueryKeys from "@/types/queryKeys";
import { filterCelebrities, filterSystems, filterTeams } from "@/utils/utils";

interface SearchPageProps {}

const SearchPage = ({}: SearchPageProps) => {
  const [searchParams] = useSearchParams();

  const searchKeyword = searchParams.get("keyword");

  const { data } = useQuery(
    [QueryKeys.searchTexts, { searchKeyword: searchKeyword || "" }],
    searchTexts,
  );

  const isMobile = useIsMobile();

  const teams = filterTeams(data || []);
  const celebrities = filterCelebrities(data || []);
  const systems = filterSystems(data || []);

  return (
    <Area>
      <Spacer height={"50px"} />
      <Content>
        <Flex justifyContent={"center"}>
          <Text font={Fonts.Medium} size={isMobile ? "20px" : "28px"}>
            <span
              style={{
                color: colorSet.primary,
              }}
            >
              {searchKeyword}
            </span>
            에 대한 검색 내용입니다
          </Text>
        </Flex>
        <Spacer height={"100px"} />
        <Flex justifyContent={"center"}>
          <Text font={Fonts.Medium} size={isMobile ? "20px" : "28px"}>
            공연팀
          </Text>

          <Spacer height={"30px"} />

          <Divider
            style={{
              height: "2px",
            }}
          />

          <Spacer height={"30px"} />

          {teams.length ? (
            <Grid
              gridTemplateColumns={isMobile ? "1fr" : "1fr 1fr"}
              gap={"20px"}
            >
              {teams.map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </Grid>
          ) : (
            <Text size={isMobile ? "16px" : "20px"} color={colorSet.textGray}>
              검색 결과가 없습니다
            </Text>
          )}
        </Flex>

        <Spacer height={"100px"} />

        <Flex justifyContent={"center"}>
          <Text font={Fonts.Medium} size={isMobile ? "20px" : "28px"}>
            연예인
          </Text>

          <Spacer height={"30px"} />

          <Divider
            style={{
              height: "2px",
            }}
          />

          <Spacer height={"30px"} />

          {celebrities.length ? (
            <Grid
              gridTemplateColumns={isMobile ? "1fr" : "1fr 1fr"}
              gap={"20px"}
            >
              {celebrities.map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </Grid>
          ) : (
            <Text size={isMobile ? "16px" : "20px"} color={colorSet.textGray}>
              검색 결과가 없습니다
            </Text>
          )}
        </Flex>
      </Content>

      <Spacer height={"100px"} />
    </Area>
  );
};

export default SearchPage;
