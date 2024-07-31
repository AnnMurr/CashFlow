import { ThemeStyledProps } from "../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 190px;
    min-height: 100vh;
    padding-top: 2rem;
`

export const Wrapper = styled.div<ThemeStyledProps>`
    margin-bottom: 90px;
    border-radius: 15px;
    background-color:${({ themestyles }) => themestyles.statisticsBackground};
`