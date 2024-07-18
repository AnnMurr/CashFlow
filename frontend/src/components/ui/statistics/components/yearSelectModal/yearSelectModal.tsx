import { FC, useState } from "react";
import { ButtonComponent } from "../../../../shared/button/button";
import { YearPicker } from "../../../../shared/yearPicker/yearPicker";
import { RootState, StatisticalDataType } from "../../../../../redux/reducers/userStorageReduser/types";
import { useAppSelector } from "../../../../../redux/store/store";
import { BtnInner, Container, Wrapper } from "./styledYearSelectModal";

interface YearSelectModalProps {
    getFilter: (chosenYear: string | null, statisticalData: StatisticalDataType | null) => void;
}

export const YearSelectModal: FC<YearSelectModalProps> = ({ getFilter }) => {
    const [chosenYear, setChosenYear] = useState<string | null>(null);
    const { statisticalData } = useAppSelector((state: RootState) => state.storage);

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
                        func={() => getFilter(chosenYear, statisticalData)} />
                </BtnInner>
            </Wrapper>
        </Container>
    )
}