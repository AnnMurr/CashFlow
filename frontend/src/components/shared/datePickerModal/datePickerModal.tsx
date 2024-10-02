import { FC } from "react";
import { DatePickerComponent } from "../datePicker/datePicker";
import { ButtonComponent } from "../button/button";
import { FiltersModalContainer } from "../filtersModalContainer/filtersModalContainer";
import { BtnClose } from "../btnClose/btnClose";
import { BtnInner } from "./styledDatePickerModal";

interface DatePickerModalProps {
    setIsDatePickerModal: (value: boolean) => void;
    applyDate: () => void;
    setChosenDate: (value: string | null) => void;
}

export const DatePickerModal: FC<DatePickerModalProps> = ({ setIsDatePickerModal, applyDate, setChosenDate }) => {
    return (
        <FiltersModalContainer>
            <BtnClose
                btnInnerstyles={{
                    marginLeft: "auto",
                    marginBottom: "20px",
                }}
                closeBlock={setIsDatePickerModal}
                size="lg" />
            <DatePickerComponent setChosenDate={setChosenDate} />
            <BtnInner>
                <ButtonComponent
                    text="Apply"
                    color="#fff"
                    type="button"
                    func={applyDate} />
            </BtnInner>
        </FiltersModalContainer>
    )
}