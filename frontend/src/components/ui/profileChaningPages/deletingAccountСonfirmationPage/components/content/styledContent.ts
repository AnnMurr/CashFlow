import { ThemeStyledProps } from "../../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Wrapper = styled.div<ThemeStyledProps>`
    border:${({ themestyles }) => `1px solid ${themestyles.color}`};
    border-radius: 5px;
    padding: 30px;
`