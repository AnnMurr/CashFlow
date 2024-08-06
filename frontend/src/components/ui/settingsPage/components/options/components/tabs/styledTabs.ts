import { ThemeStyledProps } from "../../../../../../../contexts/themeContext/types";
import styled from "styled-components";

type CombinatedProps = ThemeStyledProps & ItemProps

interface ItemProps {
    active: string;
}

export const Container = styled.div`
    display: grid;
    grid-template-columns: 25% 70%;
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
        color:${({ themestyles }) => themestyles.settingsOptionsTabActive};
        opacity:${({ active }) => active === "true" ? "1" : "0.4"};
    }
`