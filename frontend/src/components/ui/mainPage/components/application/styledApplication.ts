import styled from "styled-components";

export const Section = styled.section`
    background-color: #e2e2e2;
    overflow: hidden;
`

export const Container = styled.div`
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 15px;
`

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 60px;

    @media screen and (max-width: 870px) {
        flex-direction: column;
        align-items: center;
    }
`