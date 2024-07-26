import styled from "styled-components";

export const Container = styled.li`
    border-bottom: 1px solid #e2e2e2;
    transition: all 0.5s ease-in-out;

    &:hover {
        background-color: #dedede;
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

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 30% 60% 10%;
    cursor: pointer;
    padding: 15px;
`

export const Category = styled.span`
    font-size: 13px;
    color: #000;
`

export const Name = styled.span`
    font-size: 14px;
    font-weight: 500;
    color: #000;
`

export const Symbol = styled.span`
    font-size: 13px;
    font-weight: 600;
    color: #000;
`

export const Value = styled.span`
    font-size: 16px;
    font-weight: 500;
    color: #000;
`

export const Arrow = styled.div`
    width: fit-content;
    margin-left: auto;
`