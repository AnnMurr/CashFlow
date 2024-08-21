import { ThemeStyledProps } from "../../../../../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Wrapper = styled.div<ThemeStyledProps>`
    padding: 60px 30px 30px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Buttons = styled.div`
    padding-top: 15px;
    width: 100%;
        padding-top: 30px;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
`