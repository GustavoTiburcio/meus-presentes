import styled from 'styled-components';

interface ItemMenuProps {
  $isSelected?: boolean;
}

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;

  @media screen and (max-width: 767px) {
    margin-top: 1rem;
  }
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 90%;

  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

export const MenuContainer = styled.div`
  width: 15%;

  div:hover{
    background: #F2F2F2;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
    margin-bottom: 1rem;
  }
`;

export const MenuInfoContainer = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 767px) {
    width: 90%;
    align-self: center;
    text-align: justify;
  }
`;

export const ItemMenu = styled.div<ItemMenuProps>`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  background: ${({ $isSelected }) => $isSelected ? '#F2F2F2' : 'none'};

  &:not(:first-child){
    border: 2px solid #E5E5E5;
    border-top: none;
  }

  &:nth-child(3){
    border-top: 2px solid #E5E5E5;
  }

  svg {
    width: 20%;
  }

  span {
    margin-left: 1rem;
    font-weight: 450;
    font-size: 1.1rem;
    width: 80%;
  }

  @media screen and (max-width: 767px) {

  }

`;

export const InicioButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;

  button:not(:first-child) {
    margin-left: 1rem;
  }

`;

export const ListaPresenteContainer = styled.div`
  margin: 1rem 0px;
  display: flex;
  flex-direction: column;
  width: 80%;
  background: #F2F2F2;

  > * {
    margin: 1rem 0px 1rem 1rem;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
    flex-direction: column;

    align-items: center;
  }

`;

export const ListaPresenteTitle = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 500;
  text-indent: 0.5rem;

  svg {
    font-size: 1.8rem;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  row-gap: 1rem;

  @media screen and (max-width: 767px) {
    justify-content: center;
    flex-direction: column;
  }

`;

export const ButtonOption = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  text-indent: 0.5rem;
  cursor: pointer;

  svg {
    font-size: 1.8rem;
  }

  &:not(:first-of-type) {
    margin-left: 1rem;
  }
  &:hover{
    text-decoration: underline;
  }

  @media screen and (max-width: 767px) {
    &:not(:first-of-type) {
    margin-left: 0rem;
  }
  }
`;
