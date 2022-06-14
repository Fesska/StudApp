import styled from "styled-components";

import { v } from "../../styles/variables";

export const SLayout = styled.div`
  display: flex;
`;

export const SMain = styled.main`
  padding: calc(${v.xxlSpacing} * 2);
  display: flex;
  width: 100vw;
  justify-content: center;
`;
