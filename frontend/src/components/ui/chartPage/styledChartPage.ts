import styled from "styled-components";

export const Container = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 40px 0 110px;
    min-height: 100vh;

    @media screen and (max-width: 520px) {
        padding: 4rem 15px 15px 15px;
    }    
`

export const Wrapper = styled.div`
    padding: 90px 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 420px) {
        padding: 60px 0 0 0;
    }  
`