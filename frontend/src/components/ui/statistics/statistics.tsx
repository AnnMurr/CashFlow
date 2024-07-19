import { FC, useEffect, useState } from "react";
import { SubBar } from "../../shared/subBar/subBar";
import { Header } from "./components/header/header";
import { List } from "./components/list/list";
import { useAppDispatch, useAppSelector } from "../../../redux/store/store";
import { DatePikerModal } from "./components/datePikerModal/datePikerModal";
import { DarkBackground } from "../../shared/darkBackground/darkBackground";
import { ItemsType, RootState } from "../../../redux/reducers/userStorageReduser/types";
import { AlertComponent, AlertComponentProps } from "../../shared/alert/alert";
import { MonthSelectModal } from "./components/monthSelectModal/monthSelectModal";
import { YearSelectModal } from "./components/yearSelectModal/yearSelectModal";
import { DateRangeModal } from "./components/dateRangeModal/dateRangeModal";
import { getFilterStatisticsForDay, getFilterStatisticsForMonth, getFilterStatisticsForRange, getFilterStatisticsForWeek, getFilterStatisticsForYear } from "../../../utils/statisticalDataUtils";
import { Container, Wrapper } from "./styledStatistics";

export const Statistics: FC = () => {
    const [isAlertActive, setIsAlertActive] = useState<AlertComponentProps | null>(null);
    const [items, setItems] = useState<ItemsType | null>(null);
    const [days, setDays] = useState<Array<string> | null>(null);
    const [chosenFilterType, setChosenFilterType] = useState<string | null>(null);
    const [isDatePikerModal, setIsDatePikerModal] = useState<boolean>(false);
    const [isMonthSelectModal, setIsMonthSelectModal] = useState<boolean>(false);
    const [isYearSelectModal, setIsYearSelectModal] = useState<boolean>(false);
    const [isDateRangeModal, setIsDateRangeModal] = useState<boolean>(false);
    const { statisticalData } = useAppSelector((state: RootState) => state.storage);
    const dispatch = useAppDispatch();

    const currentSetIsModal = isDatePikerModal
        ? setIsDatePikerModal
        : isMonthSelectModal
            ? setIsMonthSelectModal
            : isYearSelectModal
                ? setIsYearSelectModal
                : setIsDateRangeModal;

    const currentIsModal = isDatePikerModal || isMonthSelectModal || isYearSelectModal || isDateRangeModal;

    useEffect(() => {
        chosenFilterType === "Week" &&
            getFilterStatisticsForWeek(statisticalData, setIsAlertActive, chosenFilterType, dispatch);
    }, [chosenFilterType]);

    return (
        <section>
            <Container>
                <Wrapper>
                    <SubBar />
                    <Header
                        setChosenFilterType={setChosenFilterType}
                        openDatePikerModal={setIsDatePikerModal}
                        openMonthSelectModal={setIsMonthSelectModal}
                        openYearSelectModal={setIsYearSelectModal}
                        openDateRangeModal={setIsDateRangeModal} />
                    <List
                        setIsAlertActive={setIsAlertActive}
                        setItems={setItems}
                        items={items}
                        setDays={setDays}
                        days={days} />

                    {isDatePikerModal ?
                        <DatePikerModal
                            chosenFilterType={chosenFilterType}
                            setIsAlertActive={setIsAlertActive}
                            getFilter={getFilterStatisticsForDay}
                            setIsDatePikerModal={setIsDatePikerModal} />
                        : null}
                    {isMonthSelectModal ?
                        <MonthSelectModal
                            chosenFilterType={chosenFilterType}
                            setIsAlertActive={setIsAlertActive}
                            getFilter={getFilterStatisticsForMonth}
                            setIsMonthSelectModal={setIsMonthSelectModal} />
                        : null}
                    {isYearSelectModal ?
                        <YearSelectModal
                            chosenFilterType={chosenFilterType}
                            setIsAlertActive={setIsAlertActive}
                            getFilter={getFilterStatisticsForYear}
                            setIsYearSelectModal={setIsYearSelectModal} />
                        : null}
                    {isDateRangeModal ?
                        <DateRangeModal
                            chosenFilterType={chosenFilterType}
                            setIsAlertActive={setIsAlertActive}
                            getFilter={getFilterStatisticsForRange}
                            setIsDateRangeModal={setIsDateRangeModal} />
                        : null}

                    {currentIsModal ?
                        <DarkBackground
                            setIsModalActive={currentSetIsModal}
                            isModalActive={currentIsModal} />
                        : null}

                    {isAlertActive ? <AlertComponent type={isAlertActive.type} text={isAlertActive.text} /> : null}
                </Wrapper>
            </Container>
        </section >
    )
}