import { ThemeStyledProps } from '../../../../../../../../../contexts/themeContext/types';
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.li<ThemeStyledProps>`
    border-bottom: 1px solid #e2e2e2;
    transition: all 0.5s ease-in-out;
    position: relative;

    &:hover {
        background-color: ${({ themestyles }) => themestyles.lineBackgroundHover};
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
    grid-template-columns: 5% 45% 5% 5%;
    cursor: pointer;
    align-items: center;
    justify-content: space-between;
    padding: 15px;

    @media screen and (max-width: 1024px) {
        grid-template-columns: 20% 72% 5%;
    }
`

export const Title = styled.div<ThemeStyledProps>`
    h4 {
        font-size: 14px;
        color:${({ themestyles }) => themestyles.color};

        @media screen and (max-width: 580px) {
            font-size: 12px;
        }
    }
`

export const SubTitle = styled.div<ThemeStyledProps>`
    display: none;
    position: absolute;
    width: fit-content;
    padding: 10px;
    top: 2rem;
    right: -5rem;
    background-color: ${({ themestyles }) => themestyles.modalBackground};
    box-shadow: 0px 0px 7px #898181;
    border-radius: 5px;

    span {
        font-size: 12px;
        color:${({ themestyles }) => themestyles.color};
        font-weight: 400;
    }
`

export const QuestionMark = styled.div<ThemeStyledProps>`
    border: ${({ themestyles }) => `1px solid ${themestyles.color}`};
    border-radius: 50px;
    padding: 1px;
    height: 13px;
    display: flex;
    width: 13px;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    @media screen and (max-width: 1024px) {
        display: none;
    }

    &:hover ~ ${SubTitle} {
        display: block;
    }
`