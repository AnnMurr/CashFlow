import { FC } from "react";
import { Container, LinkToSignIn } from "./styledLinkToSignInBlock";

export const LinkToSignInBlock: FC = () => {
    return (
        <Container>
            <span>
                I'm already a member!
            </span>
            <LinkToSignIn to={"/sign-in"} >Sign in</LinkToSignIn>
        </Container>
    )
}