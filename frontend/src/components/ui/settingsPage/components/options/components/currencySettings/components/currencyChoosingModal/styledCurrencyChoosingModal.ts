import { ThemeStyledProps } from "../../../../../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.div<ThemeStyledProps>`
    width: 100%;
    max-width: 25rem;
    left: 50%;
    margin-left: -13rem;
    position: fixed;
    top: 20%;
    background-color:${({ themestyles }) => themestyles.modalBackground};
    z-index: 25;
    border-radius: 5px;
`

export const Wrapper = styled.div`
    padding: 30px;
`

export const BtnInner = styled.div`
    margin-top: 15px;
    max-width: 60%;
    margin-left: auto;
`

export const LoadingInner = styled.div`
    z-index: 30;
    height: 100%;
    width: 100%;
    position: fixed;
    display: flex;
    align-items: center;
    inset: 0;
`