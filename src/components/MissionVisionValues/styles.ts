import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.header`
  background-color: #d2beb0;
  color: #000;
  padding: 20px;
  text-align: center;
`;

export const Section = styled.div`
  h2 {
    font-size: 20px;
    color: #000;
  }

  p {
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

export const ValueItem = styled.div`
  margin-bottom: 10px;

  strong {
    color: #000;
  }
`;
