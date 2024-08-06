import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonComponent } from "../../../../../../shared/button/button";
import { SubTitle, Title, BtnInner } from "./styledRightBlock";

export const RightBlock: FC = () => {
    const navigate = useNavigate();

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
                <ButtonComponent
                    backgroundColor="#171717"
                    BackgroundColorHover="transparent"
                    borberColorHover="#171717"
                    disabledValue={false}
                    text="Help Center"
                    color="#fff"
                    type="button"
                    func={() => navigate("help-center")} />
            </BtnInner>
        </div>
    )
}