import styled from "styled-components";

interface ItemProps {
    active: string;
}

export const Container = styled.div`
    display: grid;
    grid-template-columns: 30% 65%;
    justify-content: space-between;
    gap: 20px;
`

export const Item = styled.li<ItemProps>`
    padding-bottom: 15px;
  

    & button {
        font-size: 23px;
    font-weight: 600;
        color: ${({ active }) => active === "true" ? "#5B8A72" : "#000"};
    }
    // border: ${({ active }) => active ? "1px solid" : "none"};
    // border-radius: 10px;
`