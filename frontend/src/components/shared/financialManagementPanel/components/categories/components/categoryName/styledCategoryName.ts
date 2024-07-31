import { ThemeStyledProps } from "../../../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.div<ThemeStyledProps>`
    text-align: center;

    span {
        font-size: 14px;
        font-weight: 600;
        word-wrap: break-word;
        color:${({ themestyles }) => themestyles.color};
    }
`