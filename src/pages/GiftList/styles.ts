import styled from 'styled-components';

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
`;
