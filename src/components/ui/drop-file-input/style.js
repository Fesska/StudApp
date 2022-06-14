import styled from "styled-components";

import { v } from "../../../styles/variables";

export const SFileInput = styled.div`
  position: relative;
  width: 400px;
  height: 200px;
  border: 2px dashed #4267b2;
  border-radius: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.bg3};

  input {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .dragover {
    opacity: 0.6;
  }
`;

export const SFileInputLabel = styled.div`
  text-align: center;
  font-weight: 600;
  padding: 10px;

  img {
    width: 100px;
  }
`;

export const SFilePreview = styled.div`
  margin-top: 30px;

  p {
    font-weight: 500;
  }
`;

export const SFilePreviewTitle = styled.p`
  margin-bottom: 20px;
`;

export const SFilePreviewItem = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.bg3};
  padding: 15px;
  border-radius: 20px;
  max-width: 400px;

  img {
    width: 50px;
    margin-right: 20px;
  }
  
}

`;

export const SFilePreviewItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const SFilePreviewItemDelete = styled.span`
  background-color: ${({ theme }) => theme.bg2};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: ${v.boxShadow};
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.3s ease;
`;
