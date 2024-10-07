import { Link } from "react-router-dom";
import { ThemeStyledProps } from "../../../../../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.li<ThemeStyledProps>`
    border-bottom: 1px solid #e2e2e2;
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

export const Wrapper = styled(Link)`
    display: grid;
    grid-template-columns: 30% 60% 10%;
    cursor: pointer;
    padding: 15px;

    @media screen and (max-width: 1024px) {
        grid-template-columns: 20% 70% 10%;
    }
`

export const Category = styled.span<ThemeStyledProps>`
    font-size: 13px;
    color:${({ themestyles }) => themestyles.color};

    @media screen and (max-width: 580px) {
        font-size: 12px;
    }
`

export const Value = styled.span<ThemeStyledProps>`
    font-size: 16px;
    font-weight: 500;
    color:${({ themestyles }) => themestyles.color};

    @media screen and (max-width: 580px) {
        font-size: 13px;
    }
`

export const Arrow = styled.div`
    width: fit-content;
    margin-left: auto;
`