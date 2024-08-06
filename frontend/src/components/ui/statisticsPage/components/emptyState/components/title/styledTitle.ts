import { ThemeStyledProps } from "../../../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Inner = styled.div<ThemeStyledProps>`
    h3 {
        font-family: "Almarai";
        font-size: 19px;
        color:${({ themestyles }) => themestyles.color};
    }
`
