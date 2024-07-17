import styled from "styled-components";
interface ContainerProps {
    iseditingdata: string;
    categorystatistic: string;
}

export const Edit = styled.button`
    margin-right: 10px;
`

export const Settings = styled.div`
    width: 0;
    margin-left: 15px;
    display: none;
`

export const Container = styled.div<ContainerProps>`
    display: flex;
    justify-content: space-between;
    display: grid;
    grid-template-columns: ${({ categorystatistic }) => categorystatistic === "true" ? "repeat(2, 1fr)" : "repeat(4, 1fr)"};
    align-items: center;
    cursor: pointer;
    padding: 5px 20px;
    color: #000;

    &:hover {
        ${Settings} {
            display: flex;
            animation: showEdit 0.5s ease forwards;
        }
        background-color: ${({ iseditingdata }) => iseditingdata === "false" ? "#dedede" : "none"};
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