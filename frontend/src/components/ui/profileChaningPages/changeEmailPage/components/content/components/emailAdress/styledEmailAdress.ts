import { Link } from 'react-router-dom';
import { ThemeStyledProps } from './../../../../../../../../contexts/themeContext/types';
import styled from "styled-components";

export const Container = styled.div<ThemeStyledProps>`
    transition: all 0.5s ease-in-out;
    cursor: pointer;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    &:hover {
        background-color:${({ themestyles }) => themestyles.lineBackgroundHover};
    }
`

export const Email = styled.div<ThemeStyledProps>`
    span {
        font-size: 16px;
        font-weight: 600;
        color:${({ themestyles }) => themestyles.color};

        @media screen and (max-width: 580px) {
            font-size: 14px;            
        }
    }
`

export const EmailAdressLink = styled(Link) <ThemeStyledProps>`
    display: flex;
    justify-content: space-between;
    padding: 20px 30px;

    @media screen and (max-width: 580px) {
        padding: 20px;          
    }
`