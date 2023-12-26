import { Button, Content, Flex, Text } from "@dohyun-ko/react-atoms";
import React from "react";
import colorSet from "src/styles/color-set";
import Fonts from "src/styles/fonts";
import styled, { CSSProperties } from "styled-components";

import useIsMobile from "@/hooks/useIsMobile";
import { Tab } from "@/types/interfaces";

interface PageHeaderProps {
  children: React.ReactNode;
}

const PageHeader = ({ children }: PageHeaderProps) => {
  return (
    <Content>
      <Flex flexDirection={"column"} alignItems={"center"}>
        {children}
      </Flex>
    </Content>
  );
};

interface TitleProps {
  text: string;
}

const Title = ({ text }: TitleProps) => {
  const isMobile = useIsMobile();

  return (
    <Text
      as={"h1"}
      size={isMobile ? "1.375rem" : "1.75rem"}
      font={Fonts.Medium}
    >
      {text}
    </Text>
  );
};

const VerticalLine = styled.div`
  width: 1px;
  height: 12px;
  background-color: ${colorSet.textLight};
`;

interface TabProps {
  tabs: Tab[];

  activeTab: Tab;

  onClickTab: (name: Tab) => void;

  gap?: CSSProperties["gap"];

  disabled?: boolean;
}

const Tabs = ({
  tabs,
  activeTab,
  onClickTab,
  gap = "20px",
  disabled,
}: TabProps) => {
  return (
    <Flex gap={gap} alignItems={"center"}>
      <VerticalLine />
      {tabs.map((tab) => (
        <React.Fragment key={tab.name}>
          <Button
            key={tab.name}
            onClick={() => {
              onClickTab(tab);
            }}
            disabled={disabled}
          >
            <Text
              size={"0.875rem"}
              color={
                tab.name === activeTab.name
                  ? colorSet.primary
                  : colorSet.textLight
              }
              textDecoration={
                tab.name === activeTab.name ? "underline" : "none"
              }
            >
              {tab.text}
            </Text>
          </Button>

          <VerticalLine />
        </React.Fragment>
      ))}
    </Flex>
  );
};

const SubTabs = ({ tabs, activeTab, onClickTab }: TabProps) => {
  const isMobile = useIsMobile();

  return (
    <Flex gap={isMobile ? "5px" : "10px"} alignItems={"center"}>
      {tabs.map((tab) => {
        const isActive = tab.name === activeTab.name;

        return (
          <React.Fragment key={tab.name}>
            <Button
              backgroundColor={isActive ? colorSet.primary : "transparent"}
              key={tab.name}
              onClick={() => {
                onClickTab(tab);
              }}
              borderRadius={"5px"}
              style={{
                padding: "0 10px",
              }}
            >
              <Text
                size={isMobile ? "0.75rem" : "0.875rem"}
                color={isActive ? colorSet.text : colorSet.textLight}
              >
                {tab.text}
              </Text>
            </Button>
          </React.Fragment>
        );
      })}
    </Flex>
  );
};

interface FilterProps {
  filters: string[];
  selectedFilter: string;
  onClickFilter: (filter: string) => void;
}

const Filter = ({ filters, selectedFilter, onClickFilter }: FilterProps) => {
  return (
    <Flex
      width={"100%"}
      justifyContent={"right"}
      style={{
        borderBottom: `1px solid ${colorSet.textLight}`,
        paddingBottom: "10px",
      }}
    >
      <select>
        {filters.map((filter) => (
          <option
            key={filter}
            value={filter}
            onClick={() => onClickFilter(filter)}
          >
            {filter}
          </option>
        ))}
      </select>
    </Flex>
  );
};

PageHeader.Title = Title;
PageHeader.Tabs = Tabs;
PageHeader.SubTabs = SubTabs;
PageHeader.Filter = Filter;

export default PageHeader;
