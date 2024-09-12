import { ThemeStyledProps } from './../../../../../../../contexts/themeContext/types';
import styled from "styled-components";

interface BtnAddInnerProps {
    isdisabled: string;
}

export const Tooltip = styled.div<ThemeStyledProps>`
    position: absolute;
    width: fit-content;
    padding: 10px;
    top: 1rem;
    right: 4rem;
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

export const BtnAddInner = styled.div<BtnAddInnerProps>`
    margin-left: auto;
    max-width: fit-content;

    &:hover ~ ${Tooltip} {
        display: ${({ isdisabled }) => isdisabled === "true" ? "block" : "none"};
    }
`

