import styled from "styled-components";

export const Container = styled.div`
    max-width: 30rem;
    cursor: pointer;
    border-radius: 5px;
    background-color: #f6f8fa;
    box-shadow: 0px 0px 5px #0000004d;

    &:hover {
        background-color: transparent;
    }
 `

export const Wrapper = styled.div`
    display: flex;
    padding: 20px;
    flex-direction: column;
    align-items: center;
    color: black;
`