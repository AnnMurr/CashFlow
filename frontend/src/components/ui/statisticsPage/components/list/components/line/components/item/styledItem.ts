import { ThemeStyledProps } from "../../../../../../../../../contexts/themeContext/types";
import styled from "styled-components";

type CombinedProps = StylesProps & ThemeStyledProps;
interface StylesProps {
    iseditingdata?: string;
    categorystatistic?: string;
    chosenfilter?: string;
}

export const Edit = styled.button`
    margin-right: 10px;
`

export const Settings = styled.div<ThemeStyledProps>`
    width: 0;
    margin-left: 15px;
    display: none;

    @media screen and (max-width: 580px) {
        position: absolute;
        background-color:${({ themestyles }) => themestyles.statisticsLineHoverBackground};
        inset: 0;
        margin: 0;
        justify-content: center;
    }
`

export const Container = styled.div<CombinedProps>`
    display: flex;
    justify-content: space-between;
    display: grid;
    grid-template-columns: ${({ categorystatistic, chosenfilter }) =>
        categorystatistic === "true" ?
            "repeat(2, 1fr)" :
            chosenfilter === "true" ?
                "40% 30% 30%" :
                "30% 35% 25% 10%"};
    text-align: ${({ categorystatistic, chosenfilter }) =>
        categorystatistic === "true" ?
            "unset" :
            chosenfilter === "true" ?
                "end" :
                "unset"};
    cursor: pointer;
    cursor: ${({ iseditingdata, categorystatistic }) =>
        iseditingdata === "false" && categorystatistic === "false" ? "pointer" : "auto"};
    padding: 5px 40px;
    color: #000;
    align-items: center;

    &:hover {
        ${Settings} {
            display: flex;
            animation: showEdit 0.3s ease forwards;

            @media screen and (max-width: 580px) {
                animation: showEditMobile 0.3s ease forwards;
            }
        }
        background-color: ${({ iseditingdata, categorystatistic, themestyles }) =>
        iseditingdata === "false" && categorystatistic === "false" ? themestyles.lineBackgroundHover : "none"};
    }

    @media screen and (max-width: 860px) {
        grid-template-columns: ${({ categorystatistic, chosenfilter }) =>
        categorystatistic === "true" ?
            "repeat(2, 1fr)" :
            chosenfilter === "true" ?
                "15% 30% 55%" :
                "10% 30% 33% 27%"};
    }

    @media screen and (max-width: 580px) {
        padding: 5px;
        grid-template-columns: ${({ categorystatistic, chosenfilter }) =>
        categorystatistic === "true" ?
            "repeat(2, 1fr)" :
            chosenfilter === "true" ?
                "15% 30% 55%" :
                "12% 35% 38% 15%"};
    }

    @keyframes showEdit {
        0% {
            width: 0;
            margin-left: 0;
            opacity: 0;
        }
        100% {
            width: 30px;
            margin-left: 20px;
            opacity: 1;
        }
    }

    @keyframes showEditMobile {
        0% {
            width: 0;
            margin-left: 0;
            opacity: 0;
        }
        100% {
            width: 100%;
            opacity: 1;
        }
    }
`

export const Category = styled.div<CombinedProps>`
    text-align: ${({ chosenfilter }) => chosenfilter === "true" ? "start" : "uset"};

    span {
        color:${({ themestyles }) => themestyles.color};
    }
`

export const IconInner = styled.div`
    width: 30px;
`

export const TimeEditBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
`

export const Date = styled.div<ThemeStyledProps>`
    display: grid;
    grid-template-columns: 75% 25%;
    
    span {
        color:${({ themestyles }) => themestyles.color};
        font-size: 16px;

        @media screen and (max-width: 580px) {
            font-size: 14px;
        }
    }

    @media screen and (max-width: 580px) {
        display: flex;
        gap: 10px;
    }
`

export const Sum = styled.div<ThemeStyledProps>`
    span {
        color:${({ themestyles }) => themestyles.color};
        font-size: 16px;

        @media screen and (max-width: 580px) {
            font-size: 14px;
        }
    }
`