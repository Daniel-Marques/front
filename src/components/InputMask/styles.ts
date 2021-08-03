import styled from 'styled-components';

export const Container = styled.div`
  & + div {
    margin-top: 24px;
  }

  h1 {
    margin-bottom: 40px;
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
  }

  svg {
    margin-right: 16px;
  }
`;
