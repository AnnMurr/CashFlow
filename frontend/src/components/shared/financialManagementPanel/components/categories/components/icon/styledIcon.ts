import styled from "styled-components";

export const Container = styled.div`
    max-width: 60px;
    margin: 0 auto;

    @media screen and (max-width: 520px) {
        max-width: 50px;            
    }
    
    img {
        touch-action: manipulation;
        -webkit-touch-callout: none;
    }
`