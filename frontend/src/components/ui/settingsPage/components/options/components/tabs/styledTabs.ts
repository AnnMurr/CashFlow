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

    @media screen and (max-width: 890px) {
        display: block;
    }
`

export const List = styled.ul<ThemeStyledProps>`
    @media screen and (max-width: 890px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        padding-bottom: 10px;
        border-bottom:${({ themestyles }) => `1px solid ${themestyles.color}`};
    }
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

        @media screen and (max-width: 580px) {
            font-size: 14px;
        }

        @media screen and (max-width: 360px) {
            font-size: 11px;
        }
    }
`

export const SettingsContainer = styled.div`
    @media screen and (max-width: 890px) {
        padding-top: 30px;
    }
`