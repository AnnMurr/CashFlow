import styled from "styled-components";

export const Container = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 15px;
    min-height: 100vh;
`

export const Wrapper = styled.div`
    padding: 60px 0;

    @media screen and (max-width: 610px) {
        padding: 40px 0 60px 0;
    }
`

export const Content = styled.div`
    padding-top: 60px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    max-width: 50rem;
    margin: 0 auto;

    @media screen and (max-width: 610px) {
        display: block;
        padding-top: 60px;
    }
`

export const Section = styled.section`
    background-color: #a2a2a266;
`

export const LoadingInner = styled.div` 
    display: flex;
    align-items: center;
    min-height: 70vh;
`