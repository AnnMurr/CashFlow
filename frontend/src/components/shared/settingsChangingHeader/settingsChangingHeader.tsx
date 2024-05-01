import { FC } from "react";
import { Wrapper, Container, Title } from "./styledSettingsChangingHeader";
import { BtnGoBack } from "../btnGoBack/btnGoBack";

export const SettingsChangingHeader: FC<any> = ({category}) => {
    return (
        <Container>
            <Wrapper>
                    <div>
                        <BtnGoBack />
                    </div>
                    <div>
                        <Title>
                            <h2>
                                {category}
                            </h2>
                        </Title>
                    </div>
            </Wrapper>
        </Container>
    )
}