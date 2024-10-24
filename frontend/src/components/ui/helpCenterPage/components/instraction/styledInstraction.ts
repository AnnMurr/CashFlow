import styled from "styled-components";

export const Container = styled.div`
    border-bottom: 1px solid #a2a2a266;
    max-width: 1300px;
    margin: 0 auto;
    padding: 90px 15px 0 15px;
`

export const Wrapper = styled.div`
    padding: 60px 0;
`

export const Title = styled.div`
    padding-bottom: 20px;
    text-align: center;

    h2 {
        font-size: 24px;

        @media screen and (max-width: 480px) {
            font-size: 18px;
        }
    }
`

export const Text = styled.div`
    p {
        font-size: 16px;

        @media screen and (max-width: 480px) {
            font-size: 14px;
            text-align: center;
        }
    }
`