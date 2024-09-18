import { ThemeStyledProps } from '../../../../../../contexts/themeContext/types';
import styled from "styled-components";

export const Container = styled.div<ThemeStyledProps>`
    position: fixed;
    width: 20rem;
    top: 50%;
    left: 50%;
    margin-top: -10rem;
    margin-left: -10rem;
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
    padding-top: 20px;
`