import { ThemeStyledProps } from "../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.div<ThemeStyledProps>`
    max-width: 310px;
    width: 100%;
    background-color:${({ themestyles }) => themestyles.enteringModalBackground};
    position: fixed;
    top: 20%;
    transform: translate(-50%, 0);
    left: 50%;
    z-index: 30;
    border-radius: 10px;

    @media screen and (max-width: 380px) {
        max-width: 17rem;           
    }
`

export const Wrapper = styled.div`
    padding: 30px 40px 50px 40px;
`

export const ButtonsInner = styled.div`
    grid-template-columns: repeat(4, 50px);
    gap: 10px;
    margin-left: auto;
    display: grid;
    padding-top: 20px;

    @media screen and (max-width: 380px) {
        grid-template-columns: repeat(4, 40px);          
    }
`

export const InputInner = styled.div`
    position: relative;
`

export const Input = styled.input<ThemeStyledProps>`
    background-color:${({ themestyles }) => themestyles.enteringModalBtnColor};
    color:${({ themestyles }) => themestyles.enteringModalColor};
    text-align: end;
    background-color: #0000;
    border: #ffdead;
    width: 100%;
    padding: 5px 30px 5px 5px;
    font-size: 30px;
`

export const DeleteBtnInner = styled.div`
    position: absolute;
    top: 35%;
    right: 0;
`

export const BtnInner = styled.div<ThemeStyledProps>`
    grid-column: span 1;
    width: 100%;
    transition: all .6s;

    & button {
        background-color:${({ themestyles }) => themestyles.enteringModalBtnBackground};
        cursor: pointer;
        text-align: center;
        border: none;
        border-radius: 5px;
        width: 50px;
        height: 50px;
        padding: 10px;
        font-size: 18px;
        box-shadow: 3px 3px 3px #0000002b;
        color: #000000;

        @media screen and (max-width: 380px) {
            width: 40px;
            height: 40px;       
        }

        &:hover {
            opacity: 0.8;
        }
    }
`

export const SaveBtnInner = styled.div`
    margin-top: 10px;
`