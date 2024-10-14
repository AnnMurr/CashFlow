import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
    background-color: #171717;
    width: 100%;
    height: 100%;
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 610px) {
        display: none;
    }
`

export const Wrapper = styled.div`
   text-align: center;
`

export const IconInner = styled.div`
    width: fit-content;
    margin: 0 auto;
    padding-bottom: 5px;

    img {
        width: 50px;
    }
`

export const Text = styled.span`
    font-size: 14px;
    color: #fff;
`

export const BtnInner = styled.div`
    margin-top: 20px;
`

export const Btn = styled(Link)`
    font-size: 14px;
    color: #fff;
    border: 1px solid #fff;
    padding: 10px;
    border-radius: 20px;
    font-weight: 600;

    &:hover {
        border: 2px solid #fff;
    }
`