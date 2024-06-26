import styled from "styled-components";

export const Container = styled.div`
    padding: 90px 0;
`

const CrossStyled = `
    content: "";
    background-color: #fff;
    width: 25px;
    display: block;
    position: absolute;
    height: 1px;
`

export const AddCategoryBtnInner = styled.div`
    margin: 60px 0 0 15px;
`

export const AddCategoryBtn = styled.button`
    padding: 30px;
    border-radius: 5px;
    background-color: #464F41;
    color: #fff;
    font-size: 50px;
    font-weight: 300;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease-in-out;
    opacity: 0.7;

    &:hover {
        opacity: 1;
    }

    &:after {
       ${CrossStyled}
    }

    &:before {
        ${CrossStyled}
        transform: rotate(90deg);
    }
`