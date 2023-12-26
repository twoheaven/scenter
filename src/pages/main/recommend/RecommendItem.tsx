import { Flex } from "@dohyun-ko/react-atoms";
import { useQuery } from "@tanstack/react-query";

import { getText } from "@/apis/text-api";
import WrapperLink from "@/components/wrapperLink/WrapperLink";
import { defaultImage } from "@/dummy-data";
import Paths from "@/types/paths";
import QueryKeys from "@/types/queryKeys";

interface RecommendItemProps {
  teamId: number;
}

const RecommendItem = ({ teamId }: RecommendItemProps) => {
  const { data } = useQuery(
    [
      QueryKeys.getText,
      {
        id: teamId,
      },
    ],
    getText,
  );

  return (
    <WrapperLink to={Paths.TeamDetail + teamId}>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        style={{
          aspectRatio: "1/1",
        }}
      >
        <img
          src={data?.mainPicture?.storedFilePath || defaultImage.storedFilePath}
          width={data?.mainPicture?.storedFilePath ? "100%" : "50%"}
          style={{
            aspectRatio: "1/1",
          }}
        />
      </Flex>
    </WrapperLink>
  );
};

export default RecommendItem;
