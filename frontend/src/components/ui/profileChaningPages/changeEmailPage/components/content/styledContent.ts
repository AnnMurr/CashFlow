import { ThemeStyledProps } from "../../../../../../contexts/themeContext/types";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div<ThemeStyledProps>`
    border:${({ themestyles }) => `1px solid ${themestyles.color}`};
    border-radius: 5px;
`

export const Description = styled.div`
    padding: 30px;
`

export const Title = styled.div<ThemeStyledProps>`
    padding-bottom: 10px;
   
    h3 {
        color:${({ themestyles }) => themestyles.color};
    }
`

export const SubTitle = styled.div<ThemeStyledProps>`
    h5 {
        color:${({ themestyles }) => themestyles.color};
        font-size: 16px;
        font-weight: 400;
    }
`
export const Email = styled.div<ThemeStyledProps>`
    span {
        font-size: 16px;
        font-weight: 600;
        color:${({ themestyles }) => themestyles.color};
    }
`

export const EmailAdressInner = styled(Link)<ThemeStyledProps>`
    display: flex;
    justify-content: space-between;
    padding: 25px 30px;
    transition: all 0.5s ease-in-out;
    cursor: pointer;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    &:hover {
        background-color:${({ themestyles }) => themestyles.lineBackgroundHover};
    }
`