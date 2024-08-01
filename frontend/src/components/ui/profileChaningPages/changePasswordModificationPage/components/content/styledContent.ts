import { ThemeStyledProps } from '../../../../../../contexts/themeContext/types';
import { styled } from 'styled-components';

export const Wrapper = styled.div<ThemeStyledProps>`
    border:${({ themestyles }) => `1px solid ${themestyles.color}`};
    border-radius: 10px;
    padding: 30px;
`

export const Title = styled.div<ThemeStyledProps>`
    h5 {
        font-size: 20px;
        font-weight: 400;
        color:${({ themestyles }) => themestyles.color};
    }
`

export const SubTitle = styled.div<ThemeStyledProps>`
    padding: 15px 0;

    span {
        font-size: 16px;
        font-weight: 400;
        color:${({ themestyles }) => themestyles.color};
    }
`

export const BtnInner = styled.div`
    max-width: 30%;
    margin-left: auto;
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