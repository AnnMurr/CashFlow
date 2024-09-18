import { ThemeStyledProps } from "../../../../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.div<ThemeStyledProps>`
    padding: 15px 0;

    b {
        font-size: 17px;
        padding-bottom: 5px;
    }

    span {
        display: inline-block;
        font-size: 14px;
        padding-top: 5px;
    }
`