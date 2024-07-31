import { styled } from "styled-components";
import { ThemeStyledProps } from "../../../contexts/themeContext/types";

export const Container = styled.div<ThemeStyledProps>`
    background-color:${({ themestyles }) => themestyles.body};
`