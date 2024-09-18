import { ThemeStyledProps } from './../../../../../../../../contexts/themeContext/types';
import styled from "styled-components";

export const Inner = styled.div<ThemeStyledProps>`
    padding-bottom: 20px;

    h5 {
        font-size: 16px;
        color:${({ themestyles }) => themestyles.color};
    }
`