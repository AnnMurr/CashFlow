import { ThemeStyledProps } from "../../../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const List = styled.ul<ThemeStyledProps>`
    border-radius: 5px;
    background-color:${({ themestyles }) => themestyles.settingsBackground};
`