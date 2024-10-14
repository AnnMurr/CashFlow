import styled from "styled-components";

export const Container = styled.div`
    margin: 0 auto;

    @media screen and (max-width: 860px) {
      grid-column: 1 / -1; 
      grid-row: 2; 
      justify-self: center;
      align-self: center; 
    }
`