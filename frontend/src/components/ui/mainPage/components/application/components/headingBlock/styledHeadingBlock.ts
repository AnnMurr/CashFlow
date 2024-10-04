import styled from "styled-components";

export const Title = styled.div`
    padding-bottom: 20px;

    h2 {
        font-size: 48px;
        color: #000;

        @media screen and (max-width: 480px) {
            font-size: 25px;
        }
    }

    @media screen and (max-width: 870px) {
        text-align: center;
    }
`

export const SubTitle = styled.div`
    h3 {
        font-size: 24px;
        font-weight: 200;
        color: #000;

        @media screen and (max-width: 480px) {
            font-size: 22px;
        }
    }

    @media screen and (max-width: 870px) {
        text-align: center;
    }
`
