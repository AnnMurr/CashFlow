import styled from "styled-components";

export const Container = styled.div`
    position: absolute;
    top: 60px;
    display: flex;
    justify-content: space-between;
    width: 100%;

    @media screen and (max-width: 780px) {
        flex-direction: column;
        position: static;
        padding-top: 60px;
    }
`
export const Wrapper = styled.div`
    display: flex;
    align-items: center;
`
