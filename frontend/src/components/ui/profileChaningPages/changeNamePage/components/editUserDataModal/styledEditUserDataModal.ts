import { ThemeStyledProps } from '../../../../../../contexts/themeContext/types';
import styled from "styled-components";

export const Container = styled.div<ThemeStyledProps>`
    position: fixed;
    width: 20rem;
    left: 50%;
    top: 20%;
    transform: translate(-50%, 0);
    background-color:${({ themestyles }) => themestyles.modalBackground};
    z-index: 25;
    border-radius: 5px;
    
    @media screen and (max-width: 580px) {
        top: 30%;      
    }

    @media screen and (max-width: 360px) {
        width: 90%;        
    }
`

export const Wrapper = styled.div`
    padding: 30px;

    @media screen and (max-width: 580px) {
        padding: 20px;          
    }
`

export const BtnInner = styled.div`
    max-width: 30%;
    margin-left: auto;
    padding-top: 20px;
`