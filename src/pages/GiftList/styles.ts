import styled from 'styled-components';
import { InputContainer } from '../CreateList/styles';

interface ITabProps {
  $isSelected?: boolean;
}

interface IGiftProps {
  hidden?: boolean;
}

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1rem 0rem;
  align-items: center;
`;

export const TabsContainer = styled.div`
  margin: 1rem 0px;
  width: 80%;
  display: flex;
`;

export const Tab = styled.div<ITabProps>`
  display: flex;
  width: 50%;
  justify-content: center;
  padding:1rem;
  font-weight: 500;
  cursor: pointer;

  border: 1px solid grey;
  border-radius: 5px;

  ${({ $isSelected }) => $isSelected ? `
    border-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    cursor: default` : `
    border-top: 0;
    border-left:0;
    border-right:0;
    border-bottom-left-radius:0;
    border-bottom-right-radius: 0;
  `}

  ${({ $isSelected }) => !$isSelected ?
    `&:hover {background-color: #f2f2f2;`
    : ''}
`;

export const GiftsContainer = styled.div`
  margin: 2rem 0px;
  width: 80%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 3rem;
  /* column-gap: 0.5rem; */
`;

export const Gift = styled.div<IGiftProps>`
  display: flex;
  visibility: ${({ hidden }) => hidden ? 'hidden' : 'visible'};
  flex-direction: column;
  width: 24%;
  /* background-color: yellow; */
  font-weight: 500;
  text-transform: capitalize;
  border: 1px solid #D3D3D3;
  border-radius: 5px;
  align-items: center;
  box-shadow: 10px 10px 5px -9px rgba(0,0,0,0.75);
  -webkit-box-shadow: 10px 10px 5px -9px rgba(0,0,0,0.75);
  -moz-box-shadow: 10px 10px 5px -9px rgba(0,0,0,0.75);

  img {
    margin-top: 1rem;
    max-height: 100px;
    object-fit: contain;
    align-self: center;
  }
  p {
    max-width: 100%;
  }

  hr {
    /* border-top: 1px solid #D3D3D3; */
    width: 80%;
    margin: 1rem 0px;
  }
  b{
    margin-top: 1rem;
  }
`;

export const ButtonsContainer = styled.div`
  /* margin-top: 1rem; */
  margin-bottom: 1rem;
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

export const ActionButton = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor:pointer;
  margin-bottom: 1rem;

  svg {
    font-size: 2rem;
  }

  &:hover{
    color: grey;
  }
`;

export const CustomInputContainer = styled(InputContainer)`
    width: 80%;
    margin: 0.3rem 0px;
`;
