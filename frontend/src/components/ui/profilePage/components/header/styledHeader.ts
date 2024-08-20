import { ThemeStyledProps } from "../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.div<ThemeStyledProps>`
    border-bottom:${({ themestyles }) => `1px solid ${themestyles.color}`};
`

export const Wrapper = styled.div`
    padding: 40px 0;
    display: flex;
`