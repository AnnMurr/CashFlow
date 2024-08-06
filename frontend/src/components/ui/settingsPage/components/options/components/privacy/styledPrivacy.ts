import { ThemeStyledProps } from "../../../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const List = styled.ul<ThemeStyledProps>`
    max-width: 35rem;
    border-radius: 5px;
    background-color:${({ themestyles }) => themestyles.settingsBackground};
`