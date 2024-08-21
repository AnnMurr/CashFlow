import { FC } from "react";
import { ButtonComponent } from "../../../../shared/button/button";
import { YearPicker } from "../../../../shared/yearPicker/yearPicker";
import { BtnClose } from "../../../../shared/btnClose/btnClose";
import { FiltersModalContainer } from "../../../../shared/filtersModalContainer/filtersModalContainer";
import { BtnInner } from "./styledYearSelectModal";

interface YearSelectModalProps {
    setIsYearSelectModal: (value: boolean) => void;
    setChosenYear: (value: string | null) => void;
    applyYear: () => void;
}

export const YearSelectModal: FC<YearSelectModalProps> = ({
    setIsYearSelectModal, setChosenYear, applyYear }) => {
    return (
        <FiltersModalContainer>
            <BtnClose
                btnInnerstyles={{
                    marginLeft: "auto",
                    paddingBottom: "20px",
                }}
                closeBlock={setIsYearSelectModal}
                size="lg" />
            <YearPicker setChosenYear={setChosenYear} />
            <BtnInner>
                <ButtonComponent
                    text="Apply"
                    color="#fff"
                    type="button"
                    func={applyYear} />
            </BtnInner>
        </FiltersModalContainer>
    )
}