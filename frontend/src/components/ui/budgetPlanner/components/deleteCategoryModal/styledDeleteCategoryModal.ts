import { ThemeStyledProps } from "../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.div<ThemeStyledProps>`
    width: 100%;
    max-width: 25rem;
    left: 50%;
    position: fixed;
    top: 20%;
    transform: translate(-50%, 0);
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