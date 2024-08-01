import { ThemeStyledProps } from "../../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Wrapper = styled.div<ThemeStyledProps>`
    padding: 30px;
    border:${({ themestyles }) => `1px solid ${themestyles.color}`};
    border-radius: 10px;
`