import styled from "styled-components";

export const Container = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 15px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const Wrapper = styled.div`
    padding: 90px 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    max-width: 50rem;
`

export const Section = styled.section`
    background-color: #a2a2a266;
`