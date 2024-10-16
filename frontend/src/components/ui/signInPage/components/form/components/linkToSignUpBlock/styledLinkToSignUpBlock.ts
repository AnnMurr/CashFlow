import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.button`
    text-align: center;
    width: 100%;

    span {
        font-size: 13px;
        color: #767474;
    }
`

export const LinkToSignIn = styled(Link)`
    font-size: 13px;
    margin: 0 5px;
    color: black;
    font-weight: 600;

    &:hover {
        border-bottom: 1px solid #171717;
    }
`