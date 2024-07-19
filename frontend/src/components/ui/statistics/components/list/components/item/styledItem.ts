import styled from "styled-components";

interface StylesProps {
    iseditingdata?: string;
    categorystatistic?: string;
    chosenfilter?: string;
}

export const Edit = styled.button`
    margin-right: 10px;
`

export const Settings = styled.div`
    width: 0;
    margin-left: 15px;
    display: none;
`

export const Container = styled.div<StylesProps>`
    display: flex;
    justify-content: space-between;
    display: grid;
    grid-template-columns: ${({ categorystatistic, chosenfilter }) =>
        categorystatistic === "true" ?
            "repeat(2, 1fr)" :
            chosenfilter === "true" ?
                "40% 30% 30%" :
                "30% 35% 25% 10%"};
    text-align: ${({ categorystatistic, chosenfilter }) =>
        categorystatistic === "true" ?
            "unset" :
            chosenfilter === "true" ?
                "end" :
                "unset"};
    cursor: pointer;
    cursor: ${({ iseditingdata, categorystatistic }) =>
        iseditingdata === "false" && categorystatistic === "false" ? "pointer" : "auto"};
    padding: 5px 20px;
    color: #000;
    align-items: center;

    &:hover {
        ${Settings} {
            display: flex;
            animation: showEdit 0.5s ease forwards;
        }
        background-color: ${({ iseditingdata, categorystatistic }) =>
        iseditingdata === "false" && categorystatistic === "false" ? "#dedede" : "none"};
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

export const Category = styled.div<StylesProps>`
text-align: ${({ chosenfilter }) => chosenfilter === "true" ? "start" : "uset"};
`

export const IconInner = styled.div`
    width: 30px;
`

export const TimeEditBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
`