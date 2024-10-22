import { styled } from "styled-components";
import { ThemeStyledProps } from "../../../contexts/themeContext/types";

export const Category = styled.span<ThemeStyledProps>`
    color:${({ themestyles }) => themestyles.color};
`

export const Container = styled.div`
    position: relative;
    width: 100%;
    height: 16rem;
`;

export const LegendContainerStyles = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    overflow-X: hidden;
    height: -webkit-fill-available;

    @media screen and (max-width: 680px) {
        top: 95%;
        flex-wrap: wrap;
        display: flex;
        gap: 10px;
        overflow: visible;
        justify-content: center;
        height: auto;
    }
`