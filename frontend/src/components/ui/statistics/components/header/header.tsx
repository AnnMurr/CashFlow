import { FC } from "react";
import { DeleteBtn } from "./components/deleteBtn/deleteBtn";
import { SelectLabels } from "./components/select/select";
import { useAppSelector } from "../../../../../redux/store/store";
import { RootState } from "../../../../../redux/reducers/userStorageReduser/types";
import { BtnGoBack } from "../../../../shared/btnGoBack/btnGoBack";
import { Wrapper } from "./styledHeader";
import { VariantButtonGroup } from "./components/variantButtonGroup/variantButtonGroup";

interface HeaderProps {
    openDatePikerModal: (value: boolean) => void,
    openMonthSelectModal: (value: boolean) => void,
    openYearSelectModal: (value: boolean) => void,
    openDateRangeModal: (value: boolean) => void,
    setChosenFilterType: (value: string | null) => void,
    setStatisticType: (value: "expenses" | "income") => void;
}

export const Header: FC<HeaderProps> = ({
    openDatePikerModal, setChosenFilterType, openMonthSelectModal, openYearSelectModal, openDateRangeModal, setStatisticType }) => {
    const { chosenFilter } = useAppSelector((state: RootState) => state.storage);

    return (
        <div>
            <Wrapper>
                {chosenFilter ?
                    <BtnGoBack /> :
                    <>
                        <VariantButtonGroup setStatisticType={setStatisticType} />
                        <SelectLabels
                            setChosenFilterType={setChosenFilterType}
                            openDatePikerModal={openDatePikerModal}
                            openMonthSelectModal={openMonthSelectModal}
                            openDateRangeModal={openDateRangeModal}
                            openYearSelectModal={openYearSelectModal} />
                        <DeleteBtn />
                    </>}
            </Wrapper>
        </div>
    )
}
