import { Link } from "react-router-dom";
import styled from "styled-components";

export const Title = styled.div`
    padding-bottom: 20px;

    h4 {
        font-size: 30px;
    }
`

export const SubTitle = styled.div`
    h5 {
        font-size: 25px;
        font-weight: 300;
    }
`

export const BtnInner = styled.div`
    max-width: fit-content;
    margin-top: 30px;
`

export const Btn = styled(Link)`
    padding: 10px 20px;
    border: 1px solid #000;
    border-radius: 10px;
    color: #000;

    &:hover {
        border: 2px solid #000;
    }  
`