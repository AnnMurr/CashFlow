import { FC, useState } from "react";
import { ButtonComponent } from "../../../../shared/button/button";
import { BtnInner, Container, Wrapper } from "./styledYearSelectModal";
import { YearPicker } from "../../../../shared/yearPicker/yearPicker";

export const YearSelectModal: FC<any> = ({ getFilter }) => {
    const [chosenYear, setChosenYear] = useState();

    return (
        <Container>
            <Wrapper>
                <YearPicker setChosenYear={setChosenYear} />
                <BtnInner>
                    <ButtonComponent
                        backgroundColor="#5B8A72"
                        BackgroundColorHover="#0f4a34"
                        text="Apply"
                        color="#fff"
                        type="button"
                        func={() => getFilter(chosenYear)} />
                </BtnInner>
            </Wrapper>
        </Container>
    )
}