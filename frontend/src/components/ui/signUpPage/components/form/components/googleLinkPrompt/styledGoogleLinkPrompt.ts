import styled from "styled-components";
import Button from '@mui/material/Button';

export const Container = styled.div`
    max-width: 30rem;
    width: 100%;
    background-color: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export const Wrapper = styled.div`
    padding: 30px;
`

export const BtnCloseInner = styled.div`
    width: fit-content;
    margin-left: auto;
`


export const StyledAgreeButton = styled(Button)`
  &:hover {
    background-color: #red; 
  }
`;

export const StyledButton = styled(Button)`
&.MuiButton-root {
    color: #5B8A72;

    &:hover {
        background-color: #5b8a7221; 
    }
 }
`;