import styled from "styled-components";

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 25rem;
    margin: 0 auto;
    width: 100%;
    background-color: #fff;
    padding: 40px;
`

export const Title = styled.div`
    padding-bottom: 30px;

    h2 {
        font-size: 25px;

        @media screen and (max-width: 610px) {
            font-size: 22px;
        }
    }
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