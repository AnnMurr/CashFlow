import styled from "styled-components";

export const Edit = styled.button`
    margin-right: 10px;
`

export const Settings = styled.div`
    width: 0;
    margin-left: 15px;
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
        ${Settings} {
            display: flex;
            animation: showEdit 0.5s ease forwards;
        }
    }

    @keyframes showEdit {
        0% {
            width: 0;
            margin-left: 0;
            opaacity: 0;
        }
        100% {
            width: 30px;
            margin-left: 20px;
            opaacity: 1;
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
