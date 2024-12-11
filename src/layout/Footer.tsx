// 외부 소스에서 필요한 컴포넌트 및 에셋 가져오기
import {
  Area,
  Content,
  Divider,
  Flex,
  Spacer,
  Text,
} from "@dohyun-ko/react-atoms";

import colorSet from "@/styles/color-set";

// 푸터를 나타내는 함수형 컴포넌트
const Footer = () => {
  return (
    // 푸터 영역
    <Area>
      {/* 가로선 구분자 */}
      <Divider />

      {/* 세로 간격 */}
      <Spacer height={"20px"} />

      {/* 내용 섹션 - 회사 정보 및 소셜 미디어 링크 */}
      <Content>
        {/* 항목 간 간격을 두고 정렬하는 Flex 컨테이너 */}
        <Flex justifyContent={"space-between"} gap={"10px"}>
          {/* 왼쪽 열 - 회사 정보 */}
          <Flex
            flexDirection={"column"}
            style={{
              color: colorSet.textGray,
            }}
          >
            <Text size={"14px"}>상호명 : SC 엔터테인먼트</Text>
            <Text size={"14px"}>사업자등록번호 : 215-87-82736</Text>
            <Text size={"14px"}>서울특별시 송파구 송이로 20길 4-11</Text>
            <Text size={"14px"}>Tel : 0505-510-0202</Text>
            <Text size={"14px"}>이메일 : scdata@naver.com</Text>
          </Flex>
        </Flex>
      </Content>

      {/* 세로 간격 */}
      <Spacer height={"20px"} />
    </Area>
  );
};

// Footer 컴포넌트 내보내기
export default Footer;
