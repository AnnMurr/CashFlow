import { FC } from "react";
import { SubTitle, Title, Btn, BtnInner } from "./styledRightBlock";

export const RightBlock: FC = () => {
    return (
        <div>
            <Title>
                <h4>
                    Money Manager Help Center
                </h4>
            </Title>
            <SubTitle>
                <h5>
                    You can find out regular update
                    and user manuals.
                </h5>
            </SubTitle>
            <BtnInner>
                <Btn to={"/help-center"}>
                    Help Center
                </Btn>
            </BtnInner>
        </div>
    )
}