import styled from "styled-components";

interface ItemProps {
    selected: boolean;
}

export const Container = styled.div`
    width: 50%;
    left: 50%;
    margin-left: -25%;
    position: absolute;
    top: 20%;
    background-color: #fff;
    z-index: 25;
`

export const Wrapper = styled.div`
    padding: 40px;
`

export const Item = styled.li<ItemProps>`
    padding: 5px;
    width: 50px;
    margin: 0 15px;
    cursor: pointer;
    border-bottom : ${({ selected }) => selected ? "1px solid #cacaca" : "1px solid transparent"};
    scale : ${({ selected }) => selected ? "0.9" : "none"};

    &:hover {
        border-bottom: 1px solid #cacaca;
    }
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

export const CloseBtnInner = styled.div`
    width: fit-content;
    margin-left: auto;
    margin-bottom: 10px;
`
