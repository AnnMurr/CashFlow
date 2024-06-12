import styled from "styled-components";

export const Edit = styled.button`
    width: 0;
    margin-left: 0;
    display: none;
`

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    cursor: pointer;

    &:hover {
        ${Edit} {
            display: block;
            animation: showEdit 0.5s ease forwards;
        }
    }

    @keyframes showEdit {
        0% {
            width: 0;
            margin-left: 0;
        }
        100% {
            width: 10px;
            margin-left: 20px;
        }
      }
`

export const IconInner = styled.div`
    width: 30px;
`

export const TimeEditBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
`
