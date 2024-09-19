import { ThemeStyledProps } from './../../../../../contexts/themeContext/types';
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled(Link) <ThemeStyledProps>`
    max-width: 30rem;
    width: 100%;
    cursor: pointer;
    border-radius: 5px;
    background-color:${({ themestyles }) => themestyles.chartBlockBackground}; 
    box-shadow:${({ themestyles }) => `0px 0px 5px ${themestyles.modalLayoutShadow}`};
    min-height: 362.5px;
    transition: all 0.5s ease;
    color:${({ themestyles }) => themestyles.color};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: ${({ themestyles }) => themestyles.chartBlockBackgroundHover};
    }
`

export const Title = styled.div`
    padding-top: 10px;
    
    h3 {
        font-family: Almarai;
    }
`