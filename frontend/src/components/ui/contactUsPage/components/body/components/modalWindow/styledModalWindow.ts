import styled from "styled-components";

export const Container = styled.div`
    max-width: 25rem;
    width: 100%;
    background-color: #fff;
    position: fixed;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 50%;
    z-index: 22;
    border-radius: 5px;
`

export const Wrapper = styled.div`
    padding: 40px;
    text-align: center;
`

export const Title = styled.div`
    padding-bottom: 20px;

    h2 {
        font-size: 18px;
    }
`