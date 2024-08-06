import { ThemeStyledProps } from "../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 2rem 190px 90px 190px;
    min-height: 100vh;
`

export const Wrapper = styled.div<ThemeStyledProps>` 
    border-radius: 15px;
    background-color:${({ themestyles }) => themestyles.statisticsBackground};
`