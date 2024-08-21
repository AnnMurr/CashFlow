import { ThemeStyledProps } from "../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const FilterBtn = styled.div<ThemeStyledProps>`
    color:${({ themestyles }) => themestyles.color};
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
`