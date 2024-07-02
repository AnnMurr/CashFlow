import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    max-width: 25rem;
    left: 50%;
    margin-left: -10rem;
    position: absolute;
    top: 20%;
    background-color: #fff;
    z-index: 25;
`

export const Wrapper = styled.div`
    padding: 30px;
`

export const BtnCloseInner = styled.div`
    width: fit-content;
    margin-left: auto;
`

export const Title = styled.div`
    padding-bottom: 20px;

    & h5 {
        font-size: 18px;
        font-weight: 600;
    }
`

export const BtnInner = styled.div`
    max-width: 30%;
    margin-left: auto;
    padding-top: 20px;
`