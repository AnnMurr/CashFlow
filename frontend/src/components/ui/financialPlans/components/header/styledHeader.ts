import { ThemeStyledProps } from './../../../../../contexts/themeContext/types';
import styled from "styled-components";

export const List = styled.ul`
    display: flex;
    padding-bottom: 30px;
    flex-wrap: wrap;
`

export const Item = styled.button<ThemeStyledProps>`
    font-family: Almarai;
    font-size: 16px;
    font-weight: 600;
    padding: 5px;
    border-radius: 5px;
    color:${({ themestyles }) => themestyles.color};

    @media screen and (max-width: 580px) {
        font-size: 15px;
    }
`