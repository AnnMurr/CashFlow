import { ThemeStyledProps } from "../../../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Span = styled.span<ThemeStyledProps>`
    color:${({ themestyles }) => themestyles.color};
`