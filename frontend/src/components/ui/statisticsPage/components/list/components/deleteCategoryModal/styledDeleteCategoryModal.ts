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

export const Title = styled.div<ThemeStyledProps>`
    padding-bottom: 20px;

    h5 {
        font-size: 16px;
        font-weight: 600;
        color:${({ themestyles }) => themestyles.color};
    }
`

export const BtnInner = styled.div`
    max-width: 30%;
    margin-left: auto;
    padding-top: 20px;
`