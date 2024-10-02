import { ThemeStyledProps } from './../../../../../../../contexts/themeContext/types';
import styled from "styled-components";

export const Total = styled.span<ThemeStyledProps>`
    font-weight: 600;
    font-size: 16px;
    color:${({ themestyles }) => themestyles.color};
`
