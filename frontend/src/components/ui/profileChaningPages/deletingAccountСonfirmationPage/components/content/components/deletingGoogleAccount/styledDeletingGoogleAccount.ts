import { ThemeStyledProps } from "../../../../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.div<ThemeStyledProps>`
    border:${({ themestyles }) => `1px solid ${themestyles.settingsModalBorder}`};
    border-radius: 5px;
    max-width: 40rem;
    margin: 5rem auto 0 auto;
`

export const Wrapper = styled.div`
    padding: 30px;

    @media screen and (max-width: 580px) {
        padding: 20px;       
    }
`

export const Description = styled.div`
    padding-bottom: 30px;
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
        font-size: 14px;
        font-weight: 400;
        color:${({ themestyles }) => themestyles.color};

        @media screen and (max-width: 580px) {
            font-size: 13px;        
        }
    }
`

export const BtnInner = styled.div`
    max-width: 15rem;
    margin-left: auto;

    @media screen and (max-width: 380px) {
        max-width: 100%;        
    }
`