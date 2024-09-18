import { ThemeStyledProps } from "../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Wrapper = styled.div<ThemeStyledProps>`
    max-width: 25rem;
    padding: 30px;
    margin: 10rem auto 0 auto;
    text-align: center;
`

export const Buttons = styled.div`
    display: flex;
    padding-top: 15px;
    justify-content: space-between;
    gap: 15px;
`