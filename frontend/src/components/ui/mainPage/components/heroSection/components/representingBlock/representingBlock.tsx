import { FC } from "react";
import { SubTitle, SubTitleWrap, Title } from "./styledRepresentingBlock";

export const RepresentingBlock: FC = () => {
    return (
        <div>
            <SubTitleWrap>
                <SubTitle>
                    The easiest way to manage personal finances
                </SubTitle>
            </SubTitleWrap>
            <div>
                <Title>
                    Cash Flow
                </Title>
            </div>
        </div>
    )
}
