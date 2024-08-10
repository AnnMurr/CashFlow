import { ThemeStyledProps } from "../../../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.div<ThemeStyledProps>`
    max-width: 30rem;
    cursor: pointer;
    border-radius: 5px;
    background-color:${({ themestyles }) => themestyles.subBarBackground}; 
    box-shadow:${({ themestyles }) => `0px 0px 5px ${themestyles.modalLayoutShadow}`};

    &:hover {
        background-color: transparent;
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