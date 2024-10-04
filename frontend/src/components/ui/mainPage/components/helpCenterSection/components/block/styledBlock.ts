import styled from "styled-components";

export const Container = styled.div`
    text-align: center
`

export const Title = styled.div`
    padding-bottom: 20px;

    h4 {
        font-size: 30px;

        @media screen and (max-width: 480px) {
            font-size: 20px;
        }
    }
`

export const SubTitle = styled.div`
    h5 {
        font-size: 25px;
        font-weight: 300;

        @media screen and (max-width: 480px) {
            font-size: 18px;
        }
    }
`

export const BtnInner = styled.div`
    max-width: 10rem;
    margin: 30px auto 0 auto;
`