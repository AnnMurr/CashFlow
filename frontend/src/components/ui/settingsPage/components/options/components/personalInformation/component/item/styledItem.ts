import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.li`
    border-bottom: 1px solid #a7a9a7;
    transition: all 0.5s ease-in-out;

    &:hover {
        background-color: #dedede;
    }

    &:last-child {
         border: none;
    }
`

export const Wrapper = styled(Link)`
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    align-items: center;
    padding: 15px;
`

export const Category = styled.span`
    font-size: 13px;
    color: #000;
`

export const Value = styled.span`
    font-size: 16px;
    font-weight: 500;
    color: #000;
`