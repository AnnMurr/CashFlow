import { ThemeStyledProps } from "../../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Wrapper = styled.div<ThemeStyledProps>`
    border:${({ themestyles }) => `1px solid ${themestyles.color}`};
    border-radius: 10px;
    padding: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const Category = styled.div<ThemeStyledProps>`
    h3 {
        font-size: 20px;
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