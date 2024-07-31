import { ThemeStyledProps } from "../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.div`
    margin: 0 auto;
    width: fit-content;
    text-align: center;
`

export const Title = styled.div<ThemeStyledProps>`
    padding-bottom: 10px;

    h2 {
        font-size: 23px;
        font-family: "Almarai";
        font-weight: 600;
        color:${({ themestyles }) => themestyles.color};
    }
`

export const Sum = styled.div<ThemeStyledProps>`
    span {
        font-weight: 600;
        font-size: 20px;
        color:${({ themestyles }) => themestyles.color};
    }
`