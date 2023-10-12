import styled from 'styled-components';

export const Container = styled.div`
  margin-top: -1.1rem;
  .control-next.control-arrow:before {
      content: '';
      border: solid #fff;
      border-width: 0 8px 8px 0;
      display: inline-block;
      padding: 10px;
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
      margin-right: 3rem;
    }

  .control-prev.control-arrow:before {
    content: '';
    border: solid #fff;
    border-width: 0 8px 8px 0;
    display: inline-block;
    padding: 10px;
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
    margin-left: 3rem;
  }

  @media screen and (max-width: 767px) {
    margin-top: 0rem;
  }
`;
