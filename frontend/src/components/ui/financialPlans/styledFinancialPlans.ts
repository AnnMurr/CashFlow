import styled from "styled-components";

export const Container = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 190px;
    min-height: 100vh;

    @media screen and (max-width: 1120px) {
        padding: 0 40px 0 110px;
    }

    @media screen and (max-width: 520px) {
        padding: 0 15px;
    }
`

export const Wrapper = styled.div`
    padding: 2rem 0 90px 0;

    @media screen and (max-width: 520px) {
        padding: 4rem 0 15px 0;
    }
`

export const Tables = styled.div`
    display: flex;
    gap: 30px;
    flex-direction: column;
`

export const SpinnerContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
