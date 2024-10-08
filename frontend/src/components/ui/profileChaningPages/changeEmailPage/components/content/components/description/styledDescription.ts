import { ThemeStyledProps } from '../../../../../../../../contexts/themeContext/types';
import styled from "styled-components";

export const Container = styled.div`
    padding: 30px;

    @media screen and (max-width: 580px) {
        padding: 20px;          
    }
`

export const Title = styled.div<ThemeStyledProps>`
    padding-bottom: 10px;
   
    h3 {
        font-size: 16px;
        color:${({ themestyles }) => themestyles.color};

        @media screen and (max-width: 580px) {
            font-size: 14px;            
        }
    }
`

export const SubTitle = styled.div<ThemeStyledProps>`
    h5 {
        color:${({ themestyles }) => themestyles.color};
        font-size: 14px;
        font-weight: 400;

        @media screen and (max-width: 580px) {
            font-size: 13px;            
        }
    }
`