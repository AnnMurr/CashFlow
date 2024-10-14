import { ThemeStyledProps } from "../../../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.div<ThemeStyledProps>`
    padding: 10px 0;
    background-color:${({ themestyles }) => themestyles.statisticsLineDayBackground};
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-height: 40px;

    span {
        font-weight: 600;
        font-size: 16px;

        @media screen and (max-width: 580px) {
            font-size: 14px;
        }
    }
`

export const IconInner = styled.div`
    max-width: 30px;
    margin: 0 auto;
`