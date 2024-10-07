import styled from "styled-components";

export const Container = styled.div`
    min-height: 100vh;
    margin: 0 auto;
`

export const Wrapper = styled.div`
    padding: 40px;
    height: 100%;

    @media screen and (max-width: 650px) {
        padding: 40px 0 0 0;
    }
`