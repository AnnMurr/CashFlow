import styled from "styled-components";

export const SignUpWithGoogleTitle = styled.div`
    padding: 10px 0;
    text-align: center;

    & span {
        font-size: 13px;
        color: #767474;
    }
`

export const SignUpWithGoogleBtnInner = styled.div`
    width: fit-content;
    margin: 0 auto;
`

export const SignUpWithGoogleBtn = styled.button`
    padding: 5px 8px;
    background-color: #4889f5;
    border-radius: 50px;
    transition: all 0.5s ease;

    &:hover {
        opacity: 0.8;
    }
`