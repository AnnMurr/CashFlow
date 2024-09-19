import { ThemeStyledProps } from "../../../../../contexts/themeContext/types"
import styled from "styled-components"

export const Container = styled.div<ThemeStyledProps>`
    width: 100%;
    max-width: 25rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
    background-color:${({ themestyles }) => themestyles.modalBackground};
    z-index: 25;
    border-radius: 5px;
`