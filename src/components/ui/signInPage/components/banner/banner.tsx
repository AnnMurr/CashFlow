import { FC } from "react";
import { GREEN_LOGO } from "../../../../../consts/images";
import { Container, Text, Btn, BtnInner, IconInner, Wrapper } from "./styledBanner";

export const Banner: FC = () => {
    return (
        <Container>
            <Wrapper>
                <IconInner>
                    <img src={GREEN_LOGO.default} alt="logo" />
                </IconInner>
                <div>
                    <Text>Already have an account?</Text>
                </div>
                <BtnInner>
                    <Btn to={"/"} >Sign in</Btn>
                </BtnInner>
            </Wrapper>
        </Container>
    )
}