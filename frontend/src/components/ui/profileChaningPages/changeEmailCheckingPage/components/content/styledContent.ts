import { ThemeStyledProps } from "../../../../../../contexts/themeContext/types";
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