import { ThemeStyledProps } from './../../../../../../../contexts/themeContext/types';
import styled from "styled-components";

export const Period = styled.span<ThemeStyledProps>`
    font-weight: 700;
    font-size: 18px;
    color:${({ themestyles }) => themestyles.color};
`

export const Title = styled.span<ThemeStyledProps>`
    font-weight: 600;
    font-size: 16px;
    color:${({ themestyles }) => themestyles.color};
`
