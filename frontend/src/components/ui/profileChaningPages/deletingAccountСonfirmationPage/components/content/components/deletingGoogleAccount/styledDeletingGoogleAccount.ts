import { ThemeStyledProps } from "../../../../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Description = styled.div`
    padding-bottom: 30px;
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
    max-width: 50%;
    margin-left: auto;
`