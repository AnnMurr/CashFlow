import { ThemeStyledProps } from './../../../../../contexts/themeContext/types';
import styled from "styled-components";

export const Container = styled.div<ThemeStyledProps>`
    background-color:${({ themestyles }) => themestyles.modalBackground};
    border-color:${({ themestyles }) => themestyles.modalBackground};
    border-width: 1px;
    border-radius: 5px;
    font-size: 14px,
    color:${({ themestyles }) => themestyles.color};
    box-shadow:${({ themestyles }) => `0px 0px 5px ${themestyles.modalLayoutShadow}`};

    @media screen and (max-width: 580px) {
            font-size: 12px;
    }
`

export const LabelInner = styled.div<ThemeStyledProps>`
    border-bottom:${({ themestyles }) => `1px solid ${themestyles.inputBorder}`};
    padding: 10px;

    span {
        font-size: 16px;
        font-weight: 600;
        color:${({ themestyles }) => themestyles.color};

        @media screen and (max-width: 580px) {
            font-size: 14px;
        }
    }
`

export const List = styled.ul<ThemeStyledProps>`
    padding: 10px;
`

export const Item = styled.li<ThemeStyledProps>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0 10px;
`

export const Category = styled.span<ThemeStyledProps>`
    color:${({ themestyles }) => themestyles.color};
    font-size: 17px;
    opacity: 0.6;
`

export const Amount = styled.span<ThemeStyledProps>`
    color:${({ themestyles }) => themestyles.color};
    font-size: 15px;
`

