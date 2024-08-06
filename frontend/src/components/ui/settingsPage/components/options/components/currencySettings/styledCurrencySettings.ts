import { ThemeStyledProps } from "../../../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    max-width: 35rem;
`

export const List = styled.ul<ThemeStyledProps>`
    border-radius: 5px;
    background-color:${({ themestyles }) => themestyles.settingsBackground};
`