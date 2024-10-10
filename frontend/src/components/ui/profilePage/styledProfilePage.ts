import styled from "styled-components";

export const Container = styled.div`
    max-width: 900px;
    margin: 0 auto;
    padding: 0 40px 0 110px;
    min-height: 100vh;

    @media screen and (max-width: 520px) {
        padding: 4rem 15px 15px 15px;
    }
`

export const Wrapper = styled.div`
    padding-bottom: 90px;

    @media screen and (max-width: 520px) {
        padding-bottom: 40px;
    }
`

export const LoadingInner = styled.div` 
    display: flex;
    align-items: center;
    min-height: 70vh;
`