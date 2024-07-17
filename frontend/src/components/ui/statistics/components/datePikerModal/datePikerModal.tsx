import { FC, useState } from "react";
import { DatePiker } from "../../../../shared/datePicker/datePicker";
import { ButtonComponent } from "../../../../shared/button/button";
import { BtnInner, Container, Wrapper } from "./styledDatePikerModal";

interface DatePikerModalProps {
    getFilterStatisticsForDay: (chosenDate: string | null) => void;
}

export const DatePikerModal: FC<DatePikerModalProps> = ({ getFilterStatisticsForDay }) => {
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
                        func={() => getFilterStatisticsForDay(chosenDate)} />
                </BtnInner>
            </Wrapper>
        </Container>
    )
}