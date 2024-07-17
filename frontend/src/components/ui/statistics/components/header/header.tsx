import { FC } from "react";
import { DeleteBtn } from "./components/deleteBtn/deleteBtn";
import { SelectLabels } from "./components/select/select";
import { useAppSelector } from "../../../../../redux/store/store";
import { RootState } from "../../../../../redux/reducers/userStorageReduser/types";
import { BtnGoBack } from "../../../../shared/btnGoBack/btnGoBack";
import { Wrapper } from "./styledHeader";
interface HeaderProps {
    openDatePikerModal: (value: boolean) => void,
    openMonthSelectModal: (value: boolean) => void,
    setChosenFilterType: (value: string | null) => void,
}

export const Header: FC<HeaderProps> = ({ openDatePikerModal, setChosenFilterType, openMonthSelectModal }) => {
    const { chosenFilter } = useAppSelector((state: RootState) => state.storage);

    return (
        <div>
            <Wrapper>
                {chosenFilter ?
                    <BtnGoBack /> :
                    <>
                        <SelectLabels
                            setChosenFilterType={setChosenFilterType}
                            openDatePikerModal={openDatePikerModal}
                            openMonthSelectModal={openMonthSelectModal} />
                        <DeleteBtn />
                    </>}
            </Wrapper>
        </div>
    )
}
