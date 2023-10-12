import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  margin: 1rem 0px;
  align-self: center;
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 90%;
`;

export const Menu = styled.div`
  width: 30%;
  background-color: cyan;
`;

export const MenuInfo = styled.div`
  width: 65%;
  background-color: magenta;
`;
