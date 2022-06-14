import styled from "styled-components";

import { v } from "../../styles/variables";

export const SFlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const SFixedContainer = styled.div`
  max-width: ${({ size }) => (!size ? `initial` : `${size}px`)};
  width: 100%;
  margin: 0 auto;
`;

export const SubjectContainer = styled.div`
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.bg};
  margin-top: 15px;
  padding: ${v.lgSpacing};
  display: block;

  position: relative;
`;

export const SessionCardContainer = styled.div`
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.bg};
  margin-top: 15px;
  padding: ${v.lgSpacing};
  display: flex;
  flex-wrap: wrap;
  justify-content: top;
  align-items: top;

  position: relative;
`;

export const HomeContentContainer = styled.div`
  background: ${({ theme }) => theme.bg};

  display: flex;
  flex-direaction: row;
  justify-content: space-between;

  margin-top: 15px;
`;
