import { FC } from "react";
import { ICON_LOGO_WHITE } from "../../../../../consts/images";
import { Container, Text, Btn, BtnInner, IconInner, Wrapper } from "./styledBanner";

export const Banner: FC = () => {
    return (
        <Container>
            <Wrapper>
                <IconInner>
                    <img src={ICON_LOGO_WHITE.default} alt="logo" />
                </IconInner>
                <div>
                    <Text>Already have an account?</Text>
                </div>
                <BtnInner>
                    <Btn to={"/sign-up"} >Sign up</Btn>
                </BtnInner>
            </Wrapper>
        </Container>
    )
}