import { ThemeStyledProps } from './../../../../../../../../contexts/themeContext/types';
import styled from "styled-components";

export const Container = styled.div<ThemeStyledProps>`
    padding-top: 20px;

    span {
        color:${({ themestyles }) => themestyles.color};
        font-size: 14px;
    }
`