import { ThemeStyledProps } from "../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.div<ThemeStyledProps>`
    border-bottom:${({ themestyles }) => `1px solid ${themestyles.color}`};
`

export const Wrapper = styled.div`
    padding: 40px 0;
    display: flex;
    align-items: center;
`

export const Title = styled.div<ThemeStyledProps>`
    padding-left: 10px;

    h2 {
        font-size: 20px;
        font-weight: 600;
        color:${({ themestyles }) => themestyles.color};
    }
`