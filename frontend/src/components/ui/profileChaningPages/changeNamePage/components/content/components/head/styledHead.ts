import { ThemeStyledProps } from './../../../../../../../../contexts/themeContext/types';
import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: end;
    padding-bottom: 15px;
    border-bottom: 1px solid #000;
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