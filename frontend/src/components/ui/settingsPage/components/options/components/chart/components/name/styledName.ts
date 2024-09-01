import { ThemeStyledProps } from "../../../../../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Inner = styled.div<ThemeStyledProps>`
    padding-bottom: 10px;

    span {
        font-size: 16px;
        font-weight: 700;
        color:${({ themestyles }) => themestyles.color};
        gap: 10px;
        display: flex;
        align-items: center;
    }
`