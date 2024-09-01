import { ThemeStyledProps } from "../../../../../../../contexts/themeContext/types";
import styled from "styled-components";

type CombinatedProps = ThemeStyledProps & ItemProps

interface ItemProps {
    active: string;
}

export const Container = styled.div`
    display: grid;
    grid-template-columns: 30% 70%;
    justify-content: space-between;
    gap: 20px;
    height: 100%;
`

export const Item = styled.li<CombinatedProps>`
    button {
        font-family: "Almarai";
        font-size: 16px;
        font-weight: 600;
        color:${({ themestyles }) => themestyles.settingsOptionsTabActive};
        background-color:${({ active, themestyles }) => active === "true" ? themestyles.settingsTabBtnSelected : "none"};
        padding: 5px;
        border-radius: 5px;
        cursor: pointer;

        span {
            gap: 10px;
            display: flex;
            align-items: center;
        }

        &:hover {
            background-color:${({ themestyles }) => themestyles.settingsTabBtnHover};
        }
    }
`