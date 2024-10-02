import { ThemeStyledProps } from './../../../../../contexts/themeContext/types';
import styled from "styled-components";

export const List = styled.ul`
    display: flex;
    padding-bottom: 30px;
`

export const Item = styled.button<ThemeStyledProps>`
    font-family: Almarai;
    font-size: 16px;
    font-weight: 600;
    color:${({ themestyles }) => themestyles.color};
`