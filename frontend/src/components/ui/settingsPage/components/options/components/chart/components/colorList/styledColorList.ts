import { ThemeStyledProps } from './../../../../../../../../../contexts/themeContext/types';
import { Box } from "@mui/material";
import styled from "styled-components";

interface ItemInnerProps {
    color: string;
}

export const BtnAddInner = styled.div<ThemeStyledProps>`
    width: 30px;
    height: 30px;
    border:${({ themestyles }) => `1px solid ${themestyles.color}`};
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;

    &:hover {
        opacity: 0.8;
    }
`

export const EditBlock = styled.div`
    z-index: 5;  
    justify-content: space-around; 
    width: 100%;
    display: none;
`

export const ItemInner = styled(Box)<ItemInnerProps>`
    width: 40px;
    height: 40px;
    background-color:${({ color }) => color};
    border-radius: 2px;
    border: 1px solid #898585;
    display: flex;
    align-items: center;
    position: relative;

    &:before {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        inset: 0;
        background-color: rgba(255, 255, 255, 0.35); 
        display: none;
    }

    &:hover {
        ${EditBlock} {
            display: flex;
        }

        &:before {
            display: block;
        }
    }
`