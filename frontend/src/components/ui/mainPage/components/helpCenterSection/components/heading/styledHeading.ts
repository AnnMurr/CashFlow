import styled from "styled-components";

export const Container = styled.div`
    padding-bottom: 60px;
    text-align: center;

    @media screen and (max-width: 480px) {
        padding-bottom: 30px;
    }
`

export const Title = styled.div`
    padding-bottom: 20px;

    h2 {
        font-size: 40px;
        font-weight: 800; 

        @media screen and (max-width: 480px) {
            font-size: 25px;
        }
    }
`

export const SubTitle = styled.div`
    h3 {
        font-size: 30px;
        font-weight: 300;

        @media screen and (max-width: 480px) {
            font-size: 22px;
        }
    }
`