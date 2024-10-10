import { ThemeStyledProps } from "../../../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.div<ThemeStyledProps>`
    max-width: 30rem;
    cursor: pointer;
    border-radius: 5px;
    background-color:${({ themestyles }) => themestyles.chartBlockBackground}; 
    box-shadow:${({ themestyles }) => `0px 0px 5px ${themestyles.modalLayoutShadow}`};
    min-height: 362.5px;
    transition: all 0.5s ease;

    @media screen and (max-width: 880px) {
        max-width: 23rem;
        margin: 0 auto;
        width: 100%;
    }
    
    @media screen and (max-width: 380px) {
        min-height: 10rem;
        max-width: 18rem;
    }

    &:hover {
        background-color: ${({ themestyles }) => themestyles.chartBlockBackgroundHover};
    }
 `

export const Wrapper = styled.div`
    display: flex;
    padding: 20px;
    flex-direction: column;
    align-items: center;
    color: black;
`

export const Title = styled.div<ThemeStyledProps>`
    h3 {
        color:${({ themestyles }) => themestyles.color}; 
    }
`