import { ThemeStyledProps } from "../../../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.div<ThemeStyledProps>`
    width: 100%;
    max-width: 25rem;
    left: 50%;
    margin-left: -10rem;
    position: fixed;
    top: 20%;
    background-color:${({ themestyles }) => themestyles.modalBackground};
    z-index: 25;
`

export const Wrapper = styled.div`
    padding: 30px;
`

export const BtnInner = styled.div`
    max-width: 30%;
    margin-left: auto;
    margin-top: 10px;
`

export const Label = styled.label<ThemeStyledProps>`
    font-size: 14px;
    font-weight: 600;
    color:${({ themestyles }) => themestyles.color};
`
