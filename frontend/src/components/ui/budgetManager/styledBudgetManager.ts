import styled from "styled-components";

export const Container = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 40px 0 110px;
    min-height: 100vh;

    @media screen and (max-width: 520px) {
        padding: 0 15px;
    }
`

export const Wrapper = styled.div`
    padding: 90px 0 90px 0;

    @media screen and (max-width: 520px) {
        padding-top: 150px;
    }
`

export const Links = styled.div`
    display: flex;
    gap: 20px;
    justify-content: space-around;

    @media screen and (max-width: 520px) {
        gap: 10px;
    }
`