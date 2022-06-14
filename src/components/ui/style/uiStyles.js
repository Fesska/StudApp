import styled from "styled-components";

import { v } from "../../../styles/variables";

export const SHeader = styled.div`
  width: 100%;
  height: auto;
  display: block;
  background: ${({ theme }) => theme.bg};
  padding: ${v.lgSpacing};

  position: relative;
`;
