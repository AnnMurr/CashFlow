import { ThemeStyledProps } from './../../../../../../../../contexts/themeContext/types';
import styled from "styled-components";

export const Inner = styled.div<ThemeStyledProps>`
    h5 {
        font-size: 20px;
        font-weight: 400;
        color:${({ themestyles }) => themestyles.color};
    }
`