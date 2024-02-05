import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 40px;
  text-align: center;

  ul{
    text-align: left;
    width: 80%;
  }

  p:first-letter {
    font-size: 1.3rem;
    font-weight: bold;
  }

  h1:not(:first-of-type) {
    margin-top: 1rem;
  }

`;

export const Title = styled.h1`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

export const Description = styled.p`
  font-size: 1rem;
  color: #666;
  width: 80%;
  text-align: justify;
  text-indent: 3rem;

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

export const Button = styled.button`
  background: #de344e;
  color: #fff;
  padding: 0.5rem;
  border-style: none;
  border-radius: 8px;
  min-width: 8rem;
  font-weight: bold;
  margin: 2rem 0px;

   @media screen and (max-width: 767px) {
    margin: 2rem 0px 3rem 0px;
  }
`;
