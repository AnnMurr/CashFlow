import { ThemeStyledProps } from "../../../contexts/themeContext/types";
import styled from "styled-components";

interface ItemProps {
    selected: boolean;
}

export const Container = styled.div<ThemeStyledProps>`
    width: 50%;
    left: 50%;
    position: fixed;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color:${({ themestyles }) => themestyles.modalBackground};
    z-index: 25;

    @media screen and (max-width: 780px) {
        width: 70%;  
        transform: translate(-42%, -50%);         
    }

    @media screen and (max-width: 520px) {
        width: 90%;  
        transform: translate(-50%, -50%);         
    }
`

export const Wrapper = styled.div`
    padding: 40px;

    @media screen and (max-width: 520px) {
        padding: 20px;         
    }
`

export const Item = styled.li<ItemProps>`
    padding: 5px;
    width: 50px;
    margin: 0 auto;
    cursor: pointer;
    border-bottom : ${({ selected }) => selected ? "1px solid #cacaca" : "1px solid transparent"};
    scale : ${({ selected }) => selected ? "0.9" : "none"};

    &:hover {
        border-bottom: 1px solid #cacaca;
    }
`

export const InputInner = styled.div`
    display: flex;
    flex-direction: column;    
`

export const Input = styled.input<ThemeStyledProps>`
    border: none;
    padding: 5px;
    border-bottom: 1px solid #c6c6c6;   
    font-size: 16px;
    background-color:${({ themestyles }) => themestyles.modalBackground};
    color:${({ themestyles }) => themestyles.color};
`

export const Label = styled.label<ThemeStyledProps>`
    font-weight: 600;
    padding-bottom: 10px;
    font-family: "Almarai";
    font-size: 16px;
    color:${({ themestyles }) => themestyles.color};

    @media screen and (max-width: 580px) {
        font-size: 14px;            
    }
`

export const List = styled.ul`
    padding-top: 30px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
    gap: 20px;
    overflow: hidden scroll;
    max-height: 20rem;
    scrollbar-width: none;
`

export const BtnInner = styled.div`
    padding-top: 40px;
    max-width: 30%;
    margin-left: auto;
`