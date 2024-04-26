import styled from "styled-components";

export const Container = styled.div`
    width: 50%;
    position: absolute;
    top: 20%;
    background-color: #fff;
    z-index: 25;
`

export const Wrapper = styled.div`
    padding: 40px;
`

export const Item = styled.li`
    padding: 0 15px;
`

export const InputInner = styled.div`
    display: flex;
    flex-direction: column;    
`

export const Input = styled.input`
    border: none;
    padding: 5px;
    border-bottom: 1px solid #c6c6c6;   
`

export const Label = styled.label`
    font-weight: 600;
    padding-bottom: 10px;
`

export const List = styled.ul`
    padding-top: 30px;
    display: grid;
    grid-template-columns: repeat(5,1fr);
    gap: 20px;
`

export const BtnInner = styled.div`
    padding-top: 40px;
    max-width: 40%;
`
