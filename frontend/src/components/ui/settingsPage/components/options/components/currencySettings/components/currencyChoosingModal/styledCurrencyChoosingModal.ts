import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    max-width: 420px;
    left: 50%;
    margin-left: -210px;
    position: fixed;
    top: 20%;
    background-color: #fff;
    z-index: 25;
`

export const Wrapper = styled.div`
    padding: 30px;
`

export const BtnInner = styled.div`
    margin-top: 10px;
    max-width: 210px;
    margin-left: auto;
`

export const LoadingInner = styled.div`
    z-index: 30;
    height: 100%;
    width: 100%;
    position: fixed;
    display: flex;
    align-items: center;
    inset: 0;
`