import { ThemeStyledProps } from "../../../../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.div<ThemeStyledProps>`
    padding: 15px 0;

    b {
        color:${({ themestyles }) => themestyles.color};
        font-size: 17px;
        padding-bottom: 5px;
    }

    span {
        color:${({ themestyles }) => themestyles.color};
        display: inline-block;
        font-size: 14px;
        padding-top: 5px;
    }
`