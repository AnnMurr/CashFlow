import { ThemeStyledProps } from './../../../../../contexts/themeContext/types';
import styled, { css } from "styled-components";

export const List = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(60px, 100px));
    row-gap: 20px;
    min-height: fit-content;
    align-items: end;
`

export const CrossBtnInner = styled.div`
    display: none;
`

export const Item = styled.li`
    max-width: 90px;
    position: relative;
    cursor: pointer;
    margin: 0 auto;

    @media screen and (min-width: 1025px) {
        &:hover {
            ${CrossBtnInner} {
                display: block;
            }
        }
    }
`

export const AddCategoryBtnInner = styled.div`
    margin: auto auto;
`

const CrossStyled = css<ThemeStyledProps>`
    content: "";
    background-color:${({ themestyles }) => themestyles.body};
    width: 25px;
    display: block;
    position: absolute;
    height: 2px;
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

    @media screen and (max-width: 520px) {
        padding: 25px;
    }

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