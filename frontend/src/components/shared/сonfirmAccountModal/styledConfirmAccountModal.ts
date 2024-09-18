import { ThemeStyledProps } from '../../../contexts/themeContext/types';
import styled from "styled-components";

export const Container = styled.div<ThemeStyledProps>`
    max-width: 25rem;
    margin: 5rem auto 0 auto;
    border:${({ themestyles }) => `1px solid ${themestyles.color}`};
    border-radius: 5px;
`

export const Wrapper = styled.div`
    padding: 30px;
`

export const Title = styled.div<ThemeStyledProps>`
    padding-bottom: 30px;

    h5 {
        font-size: 18px;
        font-weight: 400;
        color:${({ themestyles }) => themestyles.color};
    }
`

export const BtnInner = styled.div`
    max-width: 30%;
    margin-left: auto;
    padding-top: 20px;
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