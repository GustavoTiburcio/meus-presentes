import styled, { keyframes } from 'styled-components';
import { flash } from 'react-animations';

const flashAnimation = keyframes`${flash}`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #FFF;
  position: relative;
  z-index: 999;
`;

export const Image = styled.img`
  width: 10%;
  animation: 3s ${flashAnimation};
  animation-iteration-count: infinite;

  @media screen and (max-width: 767px) {
    width: 30%;
  }
`;

export const LoaderDefault = styled.span`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid #000;
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;


  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

