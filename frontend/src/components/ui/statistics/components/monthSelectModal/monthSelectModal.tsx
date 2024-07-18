import { MultipleSelectPlaceholder } from "../../../../shared/select/select";
import { MONTH } from "../../../../../consts";
import { FC, useEffect, useState } from "react";
import { ButtonComponent } from "../../../../shared/button/button";
import { getMonth, getYear } from "../../../../../utils/getCurrentDate";
import { useAppSelector } from "../../../../../redux/store/store";
import { RootState, StatisticalDataType } from "../../../../../redux/reducers/userStorageReduser/types";
import { BtnInner, Container, Wrapper } from "./styledMonthSelectModal";

interface MonthSelectModalProps {
    getFilter: (chosenDate: string | null, statisticalData: StatisticalDataType | null) => void;
}

export const MonthSelectModal: FC<MonthSelectModalProps> = ({ getFilter }) => {
    const [months, setMonths] = useState<Array<string> | null>(null);
    const [month, setMonth] = useState<string | null>(null);
    const { statisticalData } = useAppSelector((state: RootState) => state.storage);

    useEffect(() => {
        const currentMonthIndex = +getMonth();
        const currentYear = getYear().toString();
        const previousYear = +currentYear - 1;
        const monthsList = [];

        for (let i = currentMonthIndex - 1; i >= 0; i--) {
            monthsList.push(`${MONTH[i]} ${currentYear}`);
        }

        for (let i = MONTH.length - 1; i > currentMonthIndex - 1; i--) {
            monthsList.push(`${MONTH[i]} ${previousYear}`);
        }

        setMonths(monthsList);
        setMonth(monthsList[0]);
    }, []);

    return (
        <Container>
            <Wrapper>
                <MultipleSelectPlaceholder
                    setCategoryName={setMonth}
                    categoryName={month}
                    names={months} />
                <BtnInner>
                    <ButtonComponent
                        backgroundColor="#5B8A72"
                        BackgroundColorHover="#0f4a34"
                        text="Apply"
                        color="#fff"
                        type="button"
                        func={() => getFilter(month, statisticalData)} />
                </BtnInner>
            </Wrapper>
        </Container>
    )
}