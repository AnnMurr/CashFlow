import { ThemeStyledProps } from "../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.div<ThemeStyledProps>`
    width: 100%;
    max-width: 420px;
    left: 50%;
    margin-left: -210px;
    position: fixed;
    top: 20%;
    background-color:${({ themestyles }) => themestyles.modalBackground};
    z-index: 25;
`

export const Wrapper = styled.div`
    padding: 30px;
`

export const BtnInner = styled.div`
    margin-top: 10px;
    max-width: 210px;
    margin-left: auto;
`

export const Title = styled.div<ThemeStyledProps>`
    padding-bottom: 20px;

    h5 {
        color:${({ themestyles }) => themestyles.color};
        font-size: 16px;
        font-weight: 600;
    }
`