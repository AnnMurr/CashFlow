import { ThemeStyledProps } from "../../../../../contexts/themeContext/types";
import styled from "styled-components";

interface SelectWrapperProps {
    isdisabled: string;
}

export const Container = styled.div<ThemeStyledProps>`
    width: 100%;
    max-width: 25rem;
    left: 50%;
    position: fixed;
    top: 50%;
    transform: translate(-50%, -50%);
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

export const Tooltip = styled.div<ThemeStyledProps>`
    position: absolute;
    width: fit-content;
    padding: 10px;
    top: 1rem;
    left: 9rem;
    background-color: ${({ themestyles }) => themestyles.modalBackground};
    box-shadow: 0px 0px 7px #898181;
    border-radius: 5px;
    display: none;

    span {
        font-size: 12px;
        color:${({ themestyles }) => themestyles.color};
        font-weight: 400;
    }
`

export const SelectWrapper = styled.div<SelectWrapperProps>`
    position: relative;

    &:hover > ${Tooltip} {
        display: ${({ isdisabled }) => isdisabled === "true" ? "block" : "none"};
    }
`