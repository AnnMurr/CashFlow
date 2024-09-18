import { ThemeStyledProps } from "../../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.div<ThemeStyledProps>`
    max-width: 40rem;
    border:${({ themestyles }) => `1px solid ${themestyles.color}`};
    border-radius: 5px;
    margin: 5rem auto 0 auto;
`