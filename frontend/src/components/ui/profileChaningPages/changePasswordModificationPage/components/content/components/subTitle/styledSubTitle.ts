import { ThemeStyledProps } from './../../../../../../../../contexts/themeContext/types';
import styled from "styled-components";

export const Inner = styled.div<ThemeStyledProps>`
    padding: 10px 0;

    @media screen and (max-width: 580px) {
        padding: 5px 0;   
    }

    span {
        font-size: 16px;
        font-weight: 400;
        color:${({ themestyles }) => themestyles.color};

        @media screen and (max-width: 580px) {
            font-size: 14px;     
        }
    }
`