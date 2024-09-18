import { ThemeStyledProps } from "../../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Container = styled.div<ThemeStyledProps>`
    border:${({ themestyles }) => `1px solid ${themestyles.settingsModalBorder}`};
    border-radius: 5px;
    max-width: 40rem;
    margin: 5rem auto 0 auto;
`

export const Wrapper = styled.div`
    padding: 30px;
`