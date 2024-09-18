import { ThemeStyledProps } from '../../../../../../../../contexts/themeContext/types';
import styled from "styled-components";

export const Container = styled.div`
    padding: 30px;
`

export const Title = styled.div<ThemeStyledProps>`
    padding-bottom: 10px;
   
    h3 {
        font-size: 16px;
        color:${({ themestyles }) => themestyles.color};
    }
`

export const SubTitle = styled.div<ThemeStyledProps>`
    h5 {
        color:${({ themestyles }) => themestyles.color};
        font-size: 14px;
        font-weight: 400;
    }
`