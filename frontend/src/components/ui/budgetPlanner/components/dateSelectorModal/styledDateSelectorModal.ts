import { ThemeStyledProps } from "../../../../../contexts/themeContext/types";
import styled from "styled-components";

type CombinatedProps = ThemeStyledProps & ItemProps

interface ItemProps {
    active: string;
}

export const Container = styled.div<ThemeStyledProps>`
    width: 100%;
    max-width: 20rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
    background-color:${({ themestyles }) => themestyles.modalBackground};
    z-index: 25;
    border-radius: 5px;
`

export const Wrapper = styled.div`
    padding: 30px;
`

export const Tabs = styled.ul`
    display: flex;
`

export const BtnInner = styled.div`
    margin-top: 20px;
    max-width: 53%;
    margin-left: auto;
`

export const PickerInner = styled.div`
    padding-top: 20px;
`

export const Item = styled.li<CombinatedProps>`
    button {
        font-family: "Almarai";
        font-size: 16px;
        font-weight: 600;
        color:${({ active, themestyles }) => active === "true"  ? themestyles.buttonActiveGroupColor : themestyles.buttonGroupColor};
        padding: 5px;
        border-radius: 5px;
        cursor: pointer;

        span {
            gap: 10px;
            display: flex;
            align-items: center;
        }

        &:hover {
            background-color:${({ themestyles }) =>  themestyles.buttonGroupHover};
        }
    }
`