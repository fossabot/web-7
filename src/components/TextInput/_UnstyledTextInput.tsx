import styled from 'styled-components';

const UnstyledTextInput = styled.input`
  border: 0;
  font-size: inherit;
  font-family: inherit;
  background-color: transparent;
  -webkit-appearance: none;
  color: inherit;
  width: 100%;
  &:focus {
    outline: 0;
  }
`;

export default UnstyledTextInput;
