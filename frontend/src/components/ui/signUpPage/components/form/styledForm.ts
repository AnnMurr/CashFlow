import styled from "styled-components";

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 25rem;
    margin: 0 auto;
    width: 100%;
    background-color: #fff;
    padding: 40px;

    @media screen and (max-width: 410px) {
        padding: 25px;
    }
`

export const ErrorMessageContainer = styled.div`
    position: relative;
    bottom: 20px;
    line-height: 10px;
`

export const BtnShowPasswordInner = styled.div`
    width: fit-content;
    position: absolute;
    top: 10px;
    right: 5%;
`

export const Label = styled.label`
    position: relative;
    display: block;
`