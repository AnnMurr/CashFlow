import { ThemeStyledProps } from "../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    min-height: 100vh;
`

export const Wrapper = styled.div` 
    padding: 2rem 190px 90px 190px;
`

export const Table = styled.div<ThemeStyledProps>` 
    border-radius: 15px;
    background-color:${({ themestyles }) => themestyles.statisticsBackground};
`

export const LoadingInner = styled.div` 
    display: flex;
    align-items: center;
    min-height: 80vh;
`