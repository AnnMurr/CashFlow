import { ThemeStyledProps } from "../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.div`
    padding-bottom: 30px;
`

export const Calendar = styled.div`
    padding-right: 10px;
`

export const Select = styled.div<ThemeStyledProps>`
    display: flex;

    button {
        color:${({ themestyles }) => themestyles.color};
        font-family: Almarai;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        border-bottom:${({ themestyles }) => `1px solid ${themestyles.color}`};
    }
`