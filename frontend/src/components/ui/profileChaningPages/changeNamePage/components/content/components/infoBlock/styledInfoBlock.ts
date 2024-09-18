import { ThemeStyledProps } from './../../../../../../../../contexts/themeContext/types';
import styled from "styled-components";

export const Container = styled.div`
    padding-top: 20px;
`

export const InfoTitle = styled.div<ThemeStyledProps>`
    padding-bottom: 5px;

    h5 {
        color:${({ themestyles }) => themestyles.color}};
        font-size: 17px;
    }
`

export const InfoText = styled.div<ThemeStyledProps>`
    span {
        color:${({ themestyles }) => themestyles.color};
        font-size: 14px;
    }
`