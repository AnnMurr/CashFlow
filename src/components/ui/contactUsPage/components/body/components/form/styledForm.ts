import styled from "styled-components";

interface inputProps {
    error?: boolean;
}

export const FormWrap = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 50%;
`

export const Label = styled.label`
    padding: 10px 0 5px 0;
`

export const Input = styled.input<inputProps>`
    padding: 10px;
    border: ${({ error }) => error ? "1px solid #af0a0a" : "1px solid #767676"};
    border-radius: 5px;

    &:focus {
        border: 2px solid #0a8dfe;
    }
`

export const Textarea = styled.textarea<inputProps>`
    resize: none;
    border-radius: 5px;
    border: ${({ error }) => error ? "1px solid #af0a0a" : "1px solid #767676"};

    &:focus-visible {
        border: 2px solid #0a8dfe;
        outline: none;
    }
`

export const Btn = styled.button`
    padding: 10px 20px;
    background-color: #c33c21;
    color: #fff;
    margin-top: 40px;
    max-width: 200px;
    width: 100%;
    border-radius: 5px;
`