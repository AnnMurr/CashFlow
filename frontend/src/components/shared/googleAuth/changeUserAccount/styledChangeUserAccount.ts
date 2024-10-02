import { ThemeStyledProps } from "../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.div<ThemeStyledProps>`
    max-width: 40rem;
    margin: 5rem auto 0 auto;
    border:${({ themestyles }) => `1px solid ${themestyles.settingsModalBorder}`};
    border-radius: 5px;
`

export const Wrapper = styled.div`
    padding: 30px;
`

export const Description = styled.div<ThemeStyledProps>`
    padding-bottom: 15px;
    border-bottom:${({ themestyles }) => `1px solid ${themestyles.settingsModalBorder}`}; 
`

export const Title = styled.div<ThemeStyledProps>`
    padding-bottom: 10px;

    h3 {
        font-size: 20px;
        color:${({ themestyles }) => themestyles.color};
    }
`

export const SubTitle = styled.div<ThemeStyledProps>`
    h5 {
        font-size: 16px;
        font-weight: 400;
        color:${({ themestyles }) => themestyles.color};
    }
`

export const BtnInner = styled.div`
    max-width: 45%;
    margin-left: auto;
`

export const InfoBlock = styled.div<ThemeStyledProps>`
    padding: 20px 0;

    span {
        color:${({ themestyles }) => themestyles.color};
        font-size: 14px;
    }
`
