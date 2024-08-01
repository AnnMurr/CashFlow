import { ThemeStyledProps } from "../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.div`
    border-bottom: 1px solid #a7a9a7;
`

export const Wrapper = styled.div`
    padding: 30px 15px;
    max-width: 60%;
    margin: 0 auto;
    display: flex;
    align-items: center;
`

export const Title = styled.div<ThemeStyledProps>`
    padding-left: 10px;

    h2 {
        font-size: 25px;
        font-weight: 500;
        color:${({ themestyles }) => themestyles.color};
    }
`