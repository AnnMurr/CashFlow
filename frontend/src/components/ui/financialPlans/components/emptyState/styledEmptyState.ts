import { ThemeStyledProps } from "../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Wrapper = styled.div<ThemeStyledProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 25rem;
    padding: 30px;
    margin: 10rem auto 0 auto;
    text-align: center;
`