import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Form = styled(Unform)`
  padding: 20px 20px;

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`;
