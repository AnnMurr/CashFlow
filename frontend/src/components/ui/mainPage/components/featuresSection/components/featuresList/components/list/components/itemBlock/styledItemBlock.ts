import styled from "styled-components";

interface ItemProps {
    type: string;
}

export const Item = styled.li<ItemProps> `
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 50px;
    max-width: 360px;
    gap: 20px;
    flex-direction: ${({type}) => type === "RightBlock" ? "row-reverse" : "none"};

    &:nth-child(2) {
        padding-right: ${({type}) => type === "LeftBlock" ? "20px" : "0"};
        padding-left: ${({type}) => type === "RightBlock" ? "20px" : "0"};
    }
    
    &:nth-child(3) {
        padding-right: ${({type}) => type === "LeftBlock" ? "20px" : "0"};
        padding-left: ${({type}) => type === "RightBlock" ? "20px" : "0"};
    }
    
`

export const Title = styled.h4`
    color: #c33c21;
    font-size: 24px;
`

export const SubTitle = styled.h5`
    font-weight: 200;
    font-size: 18px;
`

export const IconInner = styled.div`
    border: 2px solid black;
    border-radius: 100px;
    max-width: 75px;
`