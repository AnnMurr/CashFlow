import styled from "styled-components";

export const Container = styled.div`
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100dvh;
`

export const Content = styled.div`
    text-align: center;
`

export const Error = styled.div`
    padding-bottom: 20px;
    line-height: 120px;

    & h2 {
        font-size: 150px;
    }
`

export const SubTitle = styled.div`
    & span {
        font-size: 60px;
        color: #575555;
    }

    & h2 {
        font-size: 20px;
        color: #575555;
    }
`