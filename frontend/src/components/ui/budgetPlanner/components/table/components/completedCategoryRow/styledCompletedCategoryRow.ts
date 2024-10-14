import { TableRow } from "@mui/material";
import { ThemeStyledProps } from "../../../../../../../contexts/themeContext/types";
import styled from "styled-components";

export const Span = styled.span<ThemeStyledProps>`
    color:${({ themestyles }) => themestyles.color};

    @media screen and (max-width: 580px) {
        font-size: 13px;
    }
`

export const Edit = styled.button`
    margin-right: 10px;
`

export const Settings = styled.div`
    margin-left: auto;
    width: fit-content;
    opacity: 0;
    transition: opacity 0.3s ease;
    display: flex;
`

export const TableRowStyled = styled(TableRow)`
    &:hover {
        ${Settings} {
            opacity: 1;
        }
    }
`