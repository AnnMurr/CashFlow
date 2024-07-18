import { FC, useState } from "react";
import { DatePiker } from "../../../../shared/datePicker/datePicker";
import { ButtonComponent } from "../../../../shared/button/button";
import { RootState, StatisticalDataType } from "../../../../../redux/reducers/userStorageReduser/types";
import { useAppSelector } from "../../../../../redux/store/store";
import { BtnInner, Container, Wrapper } from "./styledDatePikerModal";

interface DatePikerModalProps {
    getFilter: (chosenDate: string | null, statisticalData: StatisticalDataType | null) => void;
}

export const DatePikerModal: FC<DatePikerModalProps> = ({ getFilter }) => {
    const [chosenDate, setChosenDate] = useState(null);
    const { statisticalData } = useAppSelector((state: RootState) => state.storage);

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
                        func={() => getFilter(chosenDate, statisticalData)} />
                </BtnInner>
            </Wrapper>
        </Container>
    )
}