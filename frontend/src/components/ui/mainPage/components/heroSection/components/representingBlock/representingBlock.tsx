import { FC } from "react";
import { SubTitle, SubTitleWrap, Title } from "./styledRepresentingBlock";

export const RepresentingBlock: FC = () => {
    return (
        <>
            <SubTitleWrap>
                <SubTitle>
                    The easiest way to manage personal finances
                </SubTitle>
            </SubTitleWrap>
            <Title>
                <h2>
                    Cash Flow
                </h2>
            </Title>
        </>
    )
}
