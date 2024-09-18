import { ThemeStyledProps } from './../../../../../../../../contexts/themeContext/types';
import styled from "styled-components";

export const Container = styled.div<ThemeStyledProps>`
    display: flex;
    justify-content: space-between;
    align-items: end;
    padding-bottom: 15px;
    border-bottom:${({ themestyles }) => `1px solid ${themestyles.settingsModalBorder}`};
`

export const Category = styled.div<ThemeStyledProps>`
    h3 {
        font-size: 16px;
        color:${({ themestyles }) => themestyles.color};
    }
`

export const UserName = styled.div<ThemeStyledProps>`
    padding-top: 10px;

    span {
        font-size: 16px;
        color:${({ themestyles }) => themestyles.color};
    }
`