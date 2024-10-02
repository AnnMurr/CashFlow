import { ThemeStyledProps } from "../../../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.div<ThemeStyledProps>`
    width: 100%;
    max-width: 25rem;
    left: 50%;
    top: 20%;
    transform: translate(-50%, 0);
    position: fixed;
    background-color:${({ themestyles }) => themestyles.modalBackground};
    z-index: 25;
    border-radius: 5px;
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
    display: inline-block;
    font-size: 14px;
    padding: 10px 0;
    font-weight: 600;
    color:${({ themestyles }) => themestyles.color};
`
