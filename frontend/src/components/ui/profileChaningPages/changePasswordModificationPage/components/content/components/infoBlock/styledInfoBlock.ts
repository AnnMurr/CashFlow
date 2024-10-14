import { ThemeStyledProps } from "../../../../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.div<ThemeStyledProps>`
    padding: 15px 0;

    @media screen and (max-width: 580px) {
        padding: 10px 0;    
    }

    b {
        color:${({ themestyles }) => themestyles.color};
        font-size: 17px;
        padding-bottom: 5px;

        @media screen and (max-width: 580px) {
            font-size: 15px;     
        }
    }

    span {
        color:${({ themestyles }) => themestyles.color};
        display: inline-block;
        font-size: 14px;
        padding-top: 5px;

        @media screen and (max-width: 580px) {
            font-size: 13px;     
        }
    }
`