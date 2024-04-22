import { FC } from "react";
import { Nav } from "./components/nav/nav";
import { Container, Copyright, Wrapper } from "./styledFooter";

export const Footer: FC = () => {
    return (
        <footer>
            <Container>
                <Wrapper>
                    <div>
                        <Nav />
                        <Copyright>
                            Copyright @2024 All right reserved.
                        </Copyright>
                    </div>
                </Wrapper>
            </Container>
        </footer>
    )
}