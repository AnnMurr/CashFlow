import { ThemeStyledProps } from "../../../../../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.li<ThemeStyledProps>`
    border-bottom:${({ themestyles }) => `1px soled ${themestyles.color}`};
    transition: all 0.5s ease-in-out;

    &:hover {
        background-color:${({ themestyles }) => themestyles.lineBackgroundHover};
    }

    &:first-child {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

    &:last-child {
        border: none;
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
    }
`

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 30% 60% 10%;
    cursor: pointer;
    padding: 15px;
`

export const Category = styled.span<ThemeStyledProps>`
    font-size: 13px;
    color:${({ themestyles }) => themestyles.color};
`

export const Name = styled.span<ThemeStyledProps>`
    font-size: 14px;
    font-weight: 500;
    color:${({ themestyles }) => themestyles.color};
`

export const Symbol = styled.span<ThemeStyledProps>`
    font-size: 13px;
    font-weight: 600;
    color:${({ themestyles }) => themestyles.color};
`