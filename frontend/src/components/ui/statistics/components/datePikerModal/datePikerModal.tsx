import { FC, useState } from "react";
import { DatePiker } from "../../../../shared/datePicker/datePicker";
import { ButtonComponent } from "../../../../shared/button/button";
import { BtnInner, Container, Wrapper } from "./styledDatePikerModal";

interface DatePikerModalProps {
    getFilterStatistics: (chosenDate: string | null) => void;
}

export const DatePikerModal: FC<DatePikerModalProps> = ({ getFilterStatistics }) => {
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
                        func={() => getFilterStatistics(chosenDate)} />
                </BtnInner>
            </Wrapper>
        </Container>
    )
}