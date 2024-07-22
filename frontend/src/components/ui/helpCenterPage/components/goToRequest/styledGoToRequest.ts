import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 15px;
`

export const Wrapper = styled.div`
    padding: 90px 0;
    text-align: center;
`

export const Title = styled.div`
    padding-bottom: 10px;
    
    h4 {
        font-size: 18px;
    }
`

export const SubTitle = styled.div`
    h5 {
        font-weight: 300;
        font-size: 18px;
    }
`

export const BtnInner = styled.div`
    padding: 10px 20px;
    margin-top: 30px;
`

export const Btn = styled(Link)`
    padding: 10px 20px;
    background-color: #c33c21;
    color: #fff;
    margin-top: 40px;
    max-width: 200px;
    width: 100%;
    border-radius: 5px;
`