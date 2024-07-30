import { ThemeStyledProps } from "../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.div<ThemeStyledProps>`
    background-color:${({ themestyles }) => themestyles.subBarBackground};
    position: fixed;
    inset: 0 auto 0 0;
`

export const Wrapper = styled.div`
    padding: 30px;
`

export const BurgerInner = styled.div`
    padding: 5px;
`

export const List = styled.ul`
    padding-top: 20px;
`
