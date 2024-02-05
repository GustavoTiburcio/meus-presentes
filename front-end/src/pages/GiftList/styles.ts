import styled from 'styled-components';
import { ModalDiv } from '../../components/Header/styles';
import { InputWrapper } from '../CreateList/styles';

interface ITabProps {
  $isSelected?: boolean;
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

  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

export const ModalContentContainer = styled(ModalDiv)`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    width: 100%;

    img {
      width: 20%;
    }

    @media screen and (max-width: 767px) {
      img {
        width: 35%;
      }
    }
`

export const CustomInputWrapper = styled(InputWrapper)`
  width: 80%;
`
export const TabContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: cyan; */
  align-self: center;
  flex-direction: column;
  font-size: 1.2rem;
  font-weight: 450;

  .player {
    height: 15rem;
  }
`;

export const GiftsTab2Container = styled(GiftsContainer)`
  width: 100%;
`;

export const Tab2TitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
