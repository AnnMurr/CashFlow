import { ThemeStyledProps } from "../../../../../../../contexts/themeContext/types";
import styled from "styled-components";

type CombinatedProps = ThemeStyledProps & ItemProps

interface ItemProps {
    active: string;
}

export const Container = styled.div`
    display: grid;
    grid-template-columns: 30% 65%;
    justify-content: space-between;
    gap: 20px;
    height: 100%;
`

export const Item = styled.li<CombinatedProps>`
    padding-bottom: 15px;
  
    button {
        font-family: "Almarai";
        font-size: 20px;
        font-weight: 600;
        color: ${({ active, themestyles }) => active === "true" ? themestyles.settingsOptionsTabActive : "#898989"};
    }
`