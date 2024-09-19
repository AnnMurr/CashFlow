import { ThemeStyledProps } from "../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.div<ThemeStyledProps>`
    width: 100%;
    max-width: 20rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
    background-color:${({ themestyles }) => themestyles.modalBackground};
    z-index: 25;
    border-radius: 5px;
`

export const Wrapper = styled.div`
    padding: 30px;
`

export const BtnInner = styled.div`
    margin-top: 20px;
    max-width: 53%;
    margin-left: auto;
`
