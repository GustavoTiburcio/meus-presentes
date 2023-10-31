import styled from 'styled-components';

export const Container = styled.div`
  .sidebar {
    position: fixed;
    top: 0;
    left: -250px;
    width: 250px;
    height: 100%;
    background-color: #fff;
    transition: left 0.3s ease-in-out;
    overflow: scroll;
    font-weight: 450;
  }

  .sidebar.open {
    left: 0;
  }

  .sidebar ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .sidebar li {
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }

  .sidebar li:last-child {
    border-bottom: none;
  }

  @media screen and (min-width: 768px) {
    .sidebar {
      left: 0;
    }
  }
`;

export const CloseIconDiv = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
