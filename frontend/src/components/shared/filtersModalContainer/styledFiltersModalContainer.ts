import { ThemeStyledProps } from "../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.div<ThemeStyledProps>`
    width: 100%;
    max-width: 20rem;
    left: 50%;
    top: 20%;
    transform: translate(-50%, 0);
    position: fixed;
    background-color:${({ themestyles }) => themestyles.modalBackground};
    z-index: 25;
    border-radius: 5px;
    margin-left: 40px;

    @media screen and (max-width: 420px) {
        width: 90%;
    }

    @media screen and (max-width: 520px) {
        margin-left: 0;
    }  

    @media screen and (max-width: 580px) {
        top: 30%;
    }  
`

export const Wrapper = styled.div`
    padding: 30px;

    @media screen and (max-width: 580px) {
        padding: 20px;
    }  
`

export const BtnInner = styled.div`
    margin-top: 20px;
    max-width: 53%;
    margin-left: auto;
`
