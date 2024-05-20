import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.li`
    border-bottom: 1px solid #e2e2e2;
    transition: all 0.5s ease-in-out;
    position: relative;

    &:hover {
        background-color: #e2e2e2;
    }

    &:first-child {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

    &:last-child {
        border: none;
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
    }
`

export const Wrapper = styled(Link)`
    display: grid;
    grid-template-columns: 5% 45% 5% 5%;
    cursor: pointer;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
`

export const Title = styled.div`
    h4 {
        font-size: 14px;
        color: #000;
    }
`

export const SubTitle = styled.div`
    display: none;
    position: absolute;
    width: 100%;
    max-width: 200px;
    padding: 10px;
    right: -5rem;
    background-color: #ffffff;
    box-shadow: 0px 0px 7px #898181;
    border-radius: 5px;

    h5 {
        font-size: 12px;
        color: #000;
        font-weight: 400;
    }
`

export const QuestionMark = styled.div`
    border: 1px solid;
    border-radius: 50px;
    padding: 1px;
    height: 13px;
    display: flex;
    width: 13px;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover ~ ${SubTitle} {
            display: block;
    }
`