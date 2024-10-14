import styled from "styled-components";

export const Container = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 15px;
    min-height: 100vh;
`

export const Wrapper = styled.div`
    padding: 90px 0;
`

export const Content = styled.div`
    padding-top: 90px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    max-width: 50rem;
    margin: 0 auto;

    @media screen and (max-width: 610px) {
        display: block;
    }
`

export const Section = styled.section`
    background-color: #a2a2a266;
`