import { ThemeStyledProps } from "../../../../../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.div<ThemeStyledProps>`
    width: 100%;
    max-width: 25rem;
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
`

export const BtnInner = styled.div`
    margin-top: 15px;
    max-width: 60%;
    margin-left: auto;

    @media screen and (max-width: 420px) {
        max-width: 100%;
    }
`

export const LoadingInner = styled.div`
    z-index: 30;
    height: 100%;
    width: 100%;
    position: fixed;
    display: flex;
    align-items: center;
    inset: 0;
`