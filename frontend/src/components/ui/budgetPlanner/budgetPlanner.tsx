import { FC, useEffect, useState } from "react";
import { Body } from "../../shared/body/body";
import { SubBar } from "../../shared/subBar/subBar";
import { BudgetTableManager } from "./components/table/table";
import { AlertComponent, AlertComponentProps } from "../../shared/alert/alert";
import { DarkBackground } from "../../shared/darkBackground/darkBackground";
import { DateSelector } from "./components/dateSelector/dateSelector";
import { DateSelectorModal } from "./components/dateSelectorModal/dateSelectorModal";
import { MONTH } from "../../../consts";
import { getMonth } from "../../../utils/dateUtils";
import { Container, Wrapper } from "./styledBudgetPlanner";

export const BudgetPlanner: FC = () => {
    const [isAlertActive, setIsAlertActive] = useState<AlertComponentProps | null>(null);
    const [dateRange, setDateRange] = useState<string>("");
    const [isDateSelectorModal, setIsDateSelectorModal] = useState<boolean>(false);

    useEffect(() => {
        setDateRange(MONTH[getMonth()]);
    }, []);

    return (
        <Body>
            <section>
                <Container>
                    <Wrapper>
                        <SubBar />
                        <DateSelector setIsDateRangeModal={setIsDateSelectorModal} dateRange={dateRange} />
                        <BudgetTableManager dateRange={dateRange} setIsAlertActive={setIsAlertActive} />
                        {isDateSelectorModal ?
                            <>
                                <DateSelectorModal
                                    setDateRange={setDateRange}
                                    setIsDateSelectorModal={setIsDateSelectorModal}
                                    setIsAlertActive={setIsAlertActive} />
                                <DarkBackground
                                    setIsModalActive={setIsDateSelectorModal}
                                    isModalActive={isDateSelectorModal} />
                            </>
                            : null}
                        {isAlertActive ? <AlertComponent type={isAlertActive.type} text={isAlertActive.text} /> : null}
                    </Wrapper>
                </Container>
            </section>
        </Body>
    )
}