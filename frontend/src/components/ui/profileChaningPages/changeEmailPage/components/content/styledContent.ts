import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
    border: 1px solid #000;
    border-radius: 10px;
`

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
export const Email = styled.div`
    & span {
        font-size: 16px;
        font-weight: 600;
        color: #000;
    }
`

export const EmailAdressInner = styled(Link)`
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