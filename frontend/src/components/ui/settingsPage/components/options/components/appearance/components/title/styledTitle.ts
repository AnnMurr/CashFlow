import { ThemeStyledProps } from "../../../../../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Inner = styled.div<ThemeStyledProps>`
    border-bottom:${({ themestyles }) => `1px solid ${themestyles.color}`};
    padding-bottom: 10px;

    h3 {
        font-size: 20px;
        color:${({ themestyles }) => themestyles.color};

        @media screen and (max-width: 580px) {
            font-size: 16px;
        }
    }
`