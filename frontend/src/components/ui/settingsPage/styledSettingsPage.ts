import styled from "styled-components";

export const Container = styled.div`
    max-width: 1500px;
    margin: 0 auto;
    padding: 0 190px;

    @media screen and (max-width: 1110px) {
        padding: 0 90px;
    }

    @media screen and (max-width: 890px) {
        padding: 0 15px 0 90px;
    }

    @media screen and (max-width: 520px) {
        padding: 4rem 15px 15px 15px;
    }

    @media screen and (max-width: 420px) {
        padding: 54px 5px 15px 5px;
    }
`

export const LoaderInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
`