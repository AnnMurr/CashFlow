import { ThemeStyledProps } from "../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.div<ThemeStyledProps>`
    max-width: 310px;
    width: 100%;
    background-color:${({ themestyles }) => themestyles.enteringModalBackground};
    position: fixed;
    top: 20%;
    left: 50%;
    margin-left: -165px;
    z-index: 30;
    border-radius: 10px;
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
`

export const InputInner = styled.div`
    position: relative;
`

export const Input = styled.input`
    color: #fff;
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

export const BtnInner = styled.div`
    grid-column: span 1;
    width: 100%;
    transition: all .6s;

    & button {
        background-color: #fff;
        cursor: pointer;
        text-align: center;
        border: none;
        border-radius: 5px;
        width: 50px;
        height: 50px;
        padding: 10px;
        font-size: 18px;
        box-shadow: 3px 3px 3px #0000002b;

        &:hover {
            opacity: 0.8;
        }
    }
`

export const SaveBtnInner = styled.div`
    margin-top: 10px;
`