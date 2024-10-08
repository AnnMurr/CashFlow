import { ThemeStyledProps } from './../../../../../../../../contexts/themeContext/types';
import styled from "styled-components";

export const Inner = styled.div<ThemeStyledProps>`
    h5 {
        font-size: 18px;
        font-weight: 400;
        color:${({ themestyles }) => themestyles.color};

        @media screen and (max-width: 580px) {
            font-size: 16px;     
        }
    }
`