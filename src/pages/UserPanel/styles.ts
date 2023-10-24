import styled from 'styled-components';

interface ItemMenuProps {
  isSelected?: boolean;
}

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 90%;
`;

export const MenuContainer = styled.div`
  width: 15%;
  /* background-color: cyan; */
  border: 2px solid #E5E5E5;

  div:hover{
    background: #F2F2F2;
  }
`;

export const MenuInfoContainer = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  align-items: center;
  /* background-color: magenta; */
`;

export const ItemMenu = styled.div<ItemMenuProps>`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 1.5rem;
  background: ${({ isSelected }) => isSelected ? '#F2F2F2' : 'none'};

  span {
    margin-left: 1rem;
    font-weight: 450;
    font-size: 1.1rem;
  }

`;

export const InicioButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;

  button:not(:first-child) {
    margin-left: 1rem;
  }

`;
