import styled from "styled-components"

export const SubTitleWrap = styled.div`
    max-width: 500px;
    padding-bottom: 30px;
    width: 100%;

    @media screen and (max-width: 1024px) {
        max-width: 100%;
        text-align: center;
    }
`

export const SubTitle = styled.h3`
    color: #fff;
    font-size: 37px;
    font-weight: 200;

    @media screen and (max-width: 1024px) {
        font-size: 50px;
    }

    @media screen and (max-width: 680px) {
        font-size: 30px;
    }
`

export const Title = styled.div`
    h2 {
        color: #fff;
        font-size: 40px;

        @media screen and (max-width: 680px) {
            font-size: 30px;
        }
    }

    @media screen and (max-width: 1024px) {
        text-align: center;
    }
`
