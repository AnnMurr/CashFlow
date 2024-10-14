import { ThemeStyledProps } from '../../../../../../contexts/themeContext/types';
import { styled } from 'styled-components';

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
    max-width: 15rem;
    margin-left: auto;
    padding-top: 20px;

    @media screen and (max-width: 380px) {
        max-width: 100%;    
    }
`

export const BtnShowPasswordInner = styled.div`
    width: fit-content;
    position: absolute;
    top: 10px;
    right: 5%;
`

export const Label = styled.label`
    position: relative;
    display: block;
`

export const TextInner = styled.div<ThemeStyledProps>`
    span {
        font-size: 14px;
        color:${({ themestyles }) => themestyles.color};

        @media screen and (max-width: 580px) {
            font-size: 13px;     
        }
    }
`