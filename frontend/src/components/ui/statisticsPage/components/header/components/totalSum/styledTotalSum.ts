import { ThemeStyledProps } from "../../../../../../../contexts/themeContext/types";
import styled from "styled-components";

interface StylesProps {
    isfiltered: string;
}

export const TotalSumInner = styled.div<StylesProps>`
    text-align: start;
    display: flex;
    margin-left: ${({ isfiltered }) => isfiltered === "true" ? "auto" : "0"};
`

export const TotalSumTitle = styled.div<ThemeStyledProps>`
    padding-right: 10px;

    h5 {
        font-weight: 700;
        font-size: 16px;
        color:${({ themestyles }) => themestyles.color};
    }
`

export const Sum = styled.div<ThemeStyledProps>`
    span {
        font-weight: 600;
        font-size: 16px;
        color:${({ themestyles }) => themestyles.color};
    }
`