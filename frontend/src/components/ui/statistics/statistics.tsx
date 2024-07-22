import { FC, useEffect, useState } from "react";
import { SubBar } from "../../shared/subBar/subBar";
import { Header } from "./components/header/header";
import { List } from "./components/list/list";
import { useAppDispatch, useAppSelector } from "../../../redux/store/store";
import { DatePikerModal } from "./components/datePikerModal/datePikerModal";
import { DarkBackground } from "../../shared/darkBackground/darkBackground";
import { ItemType, ItemsType, RootState, UserStorageDataType } from "../../../redux/reducers/userStorageReduser/types";
import { AlertComponent, AlertComponentProps } from "../../shared/alert/alert";
import { MonthSelectModal } from "./components/monthSelectModal/monthSelectModal";
import { YearSelectModal } from "./components/yearSelectModal/yearSelectModal";
import { DateRangeModal } from "./components/dateRangeModal/dateRangeModal";
import { getFilterStatisticsForDay, getFilterStatisticsForMonth, getFilterStatisticsForRange, getFilterStatisticsForWeek, getFilterStatisticsForYear } from "../../../utils/statisticalDataUtils";
import { getDataFromUserStore, setStatisticalData } from "../../../redux/reducers/userStorageReduser/userStorageReduser";
import { Container, Wrapper } from "./styledStatistics";
import { getCurrentDate } from "../../../utils/getCurrentDate";
import { getDataFromLocalStorage } from "../../../storage/localStorage/localStorage";

export const Statistics: FC = () => {
    const [isAlertActive, setIsAlertActive] = useState<AlertComponentProps | null>(null);
    const [items, setItems] = useState<ItemsType | null>(null);
    const [days, setDays] = useState<Array<string> | null>(null);
    const [chosenFilterType, setChosenFilterType] = useState<string | null>(null);
    const [isDatePikerModal, setIsDatePikerModal] = useState<boolean>(false);
    const [isMonthSelectModal, setIsMonthSelectModal] = useState<boolean>(false);
    const [isYearSelectModal, setIsYearSelectModal] = useState<boolean>(false);
    const [isDateRangeModal, setIsDateRangeModal] = useState<boolean>(false);
    const [statisticType, setStatisticType] = useState<"expenses" | "income">("expenses");
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

    const getDataDataForStatistic = async (type: "expenses" | "income") => {
        const token = getDataFromLocalStorage("token");
        const response = (await dispatch(getDataFromUserStore(token))).payload as UserStorageDataType;
        const data = [...response.data[type]];
        const financialData: ItemsType = {};

        data.forEach(item => {
            const newDate = getCurrentDate(item.date);
            const day = newDate.split(" ")[0];

            if (financialData.hasOwnProperty(day)) {
                financialData[day].push(item);
            } else {
                financialData[day] = [item];
            }
        })

        const reverseDateRepresentation = (date: string): string => {
            const [day, month, year] = date.split('.');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        };

        const sortedDays = Object.keys(financialData).map(reverseDateRepresentation)
            .sort((a, b) => b.localeCompare(a))
            .map(date => {
                const [year, month, day] = date.split('-');
                return `${day}.${month}.${year}`;
            });

        for (const key in financialData) {
            financialData[key].sort((a: ItemType, b: ItemType) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
        }

        dispatch(setStatisticalData({ days: sortedDays, data: financialData }))
    }

    useEffect(() => {
        chosenFilterType === "Week" &&
            getFilterStatisticsForWeek(statisticalData, setIsAlertActive, chosenFilterType, dispatch);
    }, [chosenFilterType]);

    useEffect(() => { getDataDataForStatistic("expenses") }, []);

    useEffect(() => { getDataDataForStatistic(statisticType) }, [statisticType]);

    return (
        <section>
            <Container>
                <Wrapper>
                    <SubBar />
                    <Header
                        setStatisticType={setStatisticType}
                        setChosenFilterType={setChosenFilterType}
                        openDatePikerModal={setIsDatePikerModal}
                        openMonthSelectModal={setIsMonthSelectModal}
                        openYearSelectModal={setIsYearSelectModal}
                        openDateRangeModal={setIsDateRangeModal} />
                    <List
                        statisticType={statisticType}
                        getDataDataForStatistic={getDataDataForStatistic}
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