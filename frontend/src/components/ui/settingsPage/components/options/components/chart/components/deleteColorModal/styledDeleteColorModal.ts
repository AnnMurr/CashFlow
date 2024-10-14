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

export const Title = styled.div<ThemeStyledProps>`
    padding-bottom: 10px;

    h5 {
        font-size: 16px;
        font-weight: 600;
        color:${({ themestyles }) => themestyles.color};
    }
`

export const BtnInner = styled.div`
    max-width: 30%;
    margin-left: auto;
    padding-top: 20px;
`