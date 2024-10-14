import { ThemeStyledProps } from './../../../contexts/themeContext/types';
import styled from "styled-components";

export const Wrapper = styled.div`
    padding: 30px;

    @media screen and (max-width: 580px) {
        padding: 20px;
    }  
`

export const Title = styled.div<ThemeStyledProps>`
    padding-bottom: 10px;

    h5 {
        font-size: 16px;
        font-weight: 600;
        color:${({ themestyles }) => themestyles.color};

        @media screen and (max-width: 580px) {
            font-size: 14px;
        }  
    }
`

export const BtnInner = styled.div`
    max-width: 30%;
    margin-left: auto;
    padding-top: 20px;

    @media screen and (max-width: 580px) {
        max-width: 40%;
        padding-top: 10px;
    }  
`