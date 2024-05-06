import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.li`
    border-bottom: 1px solid #a7a9a7;
    transition: all 0.5s ease-in-out;

    &:hover {
        background-color: #dedede;
    }

    &:first-child {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    &:last-child {
        border: none;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
    }
`

export const Wrapper = styled(Link)`
    display: grid;
    grid-template-columns: 5% 45% 45% 5%;
    cursor: pointer;
    align-items: center;
    padding: 15px;
`

export const Title = styled.div`
    h4 {
        font-size: 14px;
        color: #000;
    }
`

export const SubTitle = styled.div`
    h5 {
        font-size: 12px;
        color: #000;
        font-weight: 400;
    }
`
