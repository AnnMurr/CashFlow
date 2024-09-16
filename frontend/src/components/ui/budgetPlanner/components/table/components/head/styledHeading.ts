import { ThemeStyledProps } from "../../../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Title = styled.span<ThemeStyledProps>`
    font-size: 16px;
    font-weight: 600;
    color: ${({ themestyles }) => themestyles.color};
`