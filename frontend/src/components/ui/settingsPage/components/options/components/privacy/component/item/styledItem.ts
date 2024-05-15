import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.li`
    border-bottom: 1px solid #a7a9a7;
    transition: all 0.5s ease-in-out;
    position: relative;

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