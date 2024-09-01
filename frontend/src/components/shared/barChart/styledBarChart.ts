import { styled } from "styled-components";
import { ThemeStyledProps } from "../../../contexts/themeContext/types";

export const Category = styled.span<ThemeStyledProps>`
    color:${({ themestyles }) => themestyles.color};
`