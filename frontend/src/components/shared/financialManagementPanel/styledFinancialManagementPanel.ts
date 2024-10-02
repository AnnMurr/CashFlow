import { ThemeStyledProps } from "../../../contexts/themeContext/types";
import styled, { css } from "styled-components";

export const Container = styled.div`
    padding: 90px 0;
`

const CrossStyled = css<ThemeStyledProps>`
    content: "";
    background-color:${({ themestyles }) => themestyles.body};
    width: 25px;
    display: block;
    position: absolute;
    height: 2px;
`

export const AddCategoryBtnInner = styled.div`
    margin: 60px 0 0 15px;
`

export const AddCategoryBtn = styled.button<ThemeStyledProps>`
    padding: 30px;
    border-radius: 5px;
    background-color:${({ themestyles }) => themestyles.addCategoryBtnBackground};
    color: #fff;
    font-size: 50px;
    font-weight: 300;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease-in-out;
    opacity: 0.7;

    &:hover {
        opacity: 1;
    }

    &:after {
       ${CrossStyled}
    }

    &:before {
        ${CrossStyled}
        transform: rotate(90deg);
    }
`