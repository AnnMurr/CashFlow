import { FC, useState } from "react";
import { DatePiker } from "../../../../shared/datePicker/datePicker";
import { ButtonComponent } from "../../../../shared/button/button";
import { BtnInner, Container, Wrapper } from "./styledDatePikerModal";

interface DatePikerModalProps {
    getFilter: (chosenDate: string | null) => void;
}

export const DatePikerModal: FC<DatePikerModalProps> = ({ getFilter }) => {
    const [chosenDate, setChosenDate] = useState(null);

    return (
        <Container>
            <Wrapper>
                <DatePiker setChosenDate={setChosenDate} />
                <BtnInner>
                    <ButtonComponent
                        backgroundColor="#5B8A72"
                        BackgroundColorHover="#0f4a34"
                        text="Apply"
                        color="#fff"
                        type="button"
                        func={() => getFilter(chosenDate)} />
                </BtnInner>
            </Wrapper>
        </Container>
    )
}