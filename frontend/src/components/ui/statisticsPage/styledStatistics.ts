import { ThemeStyledProps } from "../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    min-height: 100vh;
`

export const Wrapper = styled.div` 
    padding: 2rem 190px 90px 190px;

    @media screen and (max-width: 1120px) {
        padding: 2rem 15px 90px 95px;
    }

    @media screen and (max-width: 520px) {
        padding: 4rem 15px 15px 15px;
    }

    @media screen and (max-width: 420px) {
        padding: 54px 0 15px 0;
    }
`

export const Table = styled.div<ThemeStyledProps>` 
    border-radius: 15px;
    background-color:${({ themestyles }) => themestyles.statisticsBackground};

    @media screen and (max-width: 420px) {
        border-radius: 0px;
    }
`

export const LoadingInner = styled.div` 
    display: flex;
    align-items: center;
    min-height: 80vh;
`