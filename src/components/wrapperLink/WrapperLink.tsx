import { Link } from "react-router-dom";
import colorSet from "src/styles/color-set";
import styled from "styled-components";

const WrapperLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: ${colorSet.primary};
  }
`;

export default WrapperLink;
