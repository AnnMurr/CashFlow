import { FC } from "react";
import { Container, LinkToSignIn } from "./styledLinkToSignUpBlock";

export const LinkToSignUpBlock: FC = () => {
    return (
        <Container>
            <span>
                No account yet? Create one now!
            </span>
            <LinkToSignIn to={"/sign-up"} >Sign up</LinkToSignIn>
        </Container>
    )
}