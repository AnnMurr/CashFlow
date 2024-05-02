import styled from "styled-components";

export const Description = styled.div`
    padding: 30px;
`

export const Title = styled.div`
    padding-bottom: 10px;
`

export const SubTitle = styled.div`
    & h5 {
        font-size: 16px;
        font-weight: 400;
    }
`

export const EmailAdressInner = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 25px 30px;
    transition: all 0.5s ease-in-out;
    cursor: pointer;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    &:hover {
        background-color: rgb(246 246 246);
    }
`