import { FC, useEffect, useState } from "react";
import { SubBar } from "../../shared/subBar/subBar";
import { Header } from "./components/header/header";
import { List } from "./components/list/list";
import { useAppDispatch, useAppSelector } from "../../../redux/store/store";
import { DatePikerModal } from "./components/datePikerModal/datePikerModal";
import { DarkBackground } from "../../shared/darkBackground/darkBackground";
import { ItemType, ItemsType, RootState, StatisticalDataType } from "../../../redux/reducers/userStorageReduser/types";
import { setChosenFilter, setIsEditingData, setStatisticalData } from "../../../redux/reducers/userStorageReduser/userStorageReduser";
import { AlertComponent, AlertComponentProps } from "../../shared/alert/alert";
import { getAlert } from "../../../utils/getAlert";
import { getWeek, parseEuropeanDate } from "../../../utils/getCurrentDate";
import { MonthSelectModal } from "./components/monthSelectModal/monthSelectModal";
import { MONTH } from "../../../consts";
import { YearSelectModal } from "./components/yearSelectModal/yearSelectModal";
import { DateRangeModal } from "./components/dateRangeModal/dateRangeModal";
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

    const processStatisticalData = (data: ItemsType, dateRange: string[]) => {
        const sortedStatisticalData: Array<ItemType> = [];
        const chosenDateStatisticalData: Array<ItemType> = [];

        dateRange.forEach(date => {
            data[date]?.forEach(item => {
                const existingItemIndex = sortedStatisticalData.findIndex((x) => x.category === item.category);
                chosenDateStatisticalData.push(item);

                if (existingItemIndex !== -1) {
                    sortedStatisticalData[existingItemIndex] = {
                        ...sortedStatisticalData[existingItemIndex],
                        sum: sortedStatisticalData[existingItemIndex].sum + item.sum,
                    };
                } else {
                    sortedStatisticalData.push(item);
                }
            });
        });

        if (sortedStatisticalData.length > 0) {
            return { sortedStatisticalData, chosenDateStatisticalData };
        } else {
            getAlert({ type: "error", text: "No data for this period" }, setIsAlertActive, 3000);
            return null;
        }
    };

    const getFilterStatisticsForDay = (chosenDate: string | null, statisticalData: StatisticalDataType | null) => {
        if (!statisticalData || !chosenDate) return;

        const filteredStatisticalData = statisticalData.data[chosenDate];
        if (!filteredStatisticalData) {
            getAlert({ type: "error", text: "No data for this day" }, setIsAlertActive, 3000);
            return;
        }

        const result = processStatisticalData(statisticalData.data, [chosenDate]);

        if (result) {
            const { sortedStatisticalData, chosenDateStatisticalData } = result;
            dispatch(setIsEditingData(false));
            setIsDatePikerModal(false);
            dispatch(setChosenFilter({ isFilter: true, type: chosenFilterType, date: [chosenDate], data: chosenDateStatisticalData }));
            dispatch(setStatisticalData({ days: [chosenDate], data: { [chosenDate]: sortedStatisticalData } }));
        }
    };

    const getFilterStatisticsForWeek = (statisticalData: StatisticalDataType | null) => {
        if (!statisticalData) return;

        const week = getWeek();
        const result = processStatisticalData(statisticalData.data, week);

        if (result) {
            const { sortedStatisticalData, chosenDateStatisticalData } = result;
            const weekRange = `${week[0]} - ${week[week.length - 1]}`;
            dispatch(setIsEditingData(false));
            dispatch(setChosenFilter({ isFilter: true, type: chosenFilterType, date: week, data: chosenDateStatisticalData }));
            dispatch(setStatisticalData({ days: [weekRange], data: { [weekRange]: sortedStatisticalData } }));
        }
    };

    const getFilterStatisticsForMonth = (chosenDate: string | null, statisticalData: StatisticalDataType | null) => {
        if (!statisticalData || !chosenDate) return;

        const monthNumber = `0${MONTH.indexOf(chosenDate.split(" ")[0]) + 1}`;
        const dateRange = statisticalData.days.filter((date) => date.split(".")[1] === monthNumber);

        if (dateRange.length === 0) {
            getAlert({ type: "error", text: "No data for this month" }, setIsAlertActive, 3000);
            return;
        }

        const result = processStatisticalData(statisticalData.data, dateRange);

        if (result) {
            const { sortedStatisticalData, chosenDateStatisticalData } = result;
            setIsMonthSelectModal(false);
            dispatch(setIsEditingData(false));
            dispatch(setChosenFilter({ isFilter: true, type: chosenFilterType, date: chosenDate, data: chosenDateStatisticalData }));
            dispatch(setStatisticalData({ days: [chosenDate], data: { [chosenDate]: sortedStatisticalData } }));
        }
    };

    const getFilterStatisticsForYear = (chosenYear: string | null, statisticalData: StatisticalDataType | null) => {
        if (!statisticalData || !chosenYear) return;

        const dateRange = statisticalData.days.filter((date) => date.split(".")[2] === chosenYear);

        if (dateRange.length === 0) {
            getAlert({ type: "error", text: "No data for this year" }, setIsAlertActive, 3000);
            return;
        }

        const result = processStatisticalData(statisticalData.data, dateRange);

        if (result) {
            const { sortedStatisticalData, chosenDateStatisticalData } = result;
            setIsYearSelectModal(false);
            dispatch(setIsEditingData(false));
            dispatch(setChosenFilter({ isFilter: true, type: chosenFilterType, date: chosenYear, data: chosenDateStatisticalData }));
            dispatch(setStatisticalData({ days: [chosenYear], data: { [chosenYear]: sortedStatisticalData } }));
        }
    };

    const getFilterStatisticsForRange = (chosenDate: { startDate: string | null; endDate: string | null }, statisticalData: StatisticalDataType | null) => {
        if (!statisticalData || !chosenDate.startDate || !chosenDate.endDate) return;

        const dateStart = parseEuropeanDate(chosenDate.startDate);
        const dateEnd = parseEuropeanDate(chosenDate.endDate);
        const dateRange = statisticalData.days.filter(item => {
            const itemDate = parseEuropeanDate(item);
            return itemDate >= dateStart && itemDate <= dateEnd;
        });

        if (dateRange.length === 0) {
            getAlert({ type: "error", text: "No data for this range" }, setIsAlertActive, 3000);
            return;
        }

        const result = processStatisticalData(statisticalData.data, dateRange);

        if (result) {
            const { sortedStatisticalData, chosenDateStatisticalData } = result;
            const range = `${chosenDate.startDate} - ${chosenDate.endDate}`;
            setIsDateRangeModal(false);
            dispatch(setIsEditingData(false));
            dispatch(setChosenFilter({ isFilter: true, type: chosenFilterType, date: range, data: chosenDateStatisticalData }));
            dispatch(setStatisticalData({ days: [range], data: { [range]: sortedStatisticalData } }));
        }
    };

    useEffect(() => {
        chosenFilterType === "Week" && getFilterStatisticsForWeek(statisticalData);
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

                    {isDatePikerModal ? <DatePikerModal getFilter={getFilterStatisticsForDay} /> : null}
                    {isMonthSelectModal ? <MonthSelectModal getFilter={getFilterStatisticsForMonth} /> : null}
                    {isYearSelectModal ? <YearSelectModal getFilter={getFilterStatisticsForYear} /> : null}
                    {isDateRangeModal ? <DateRangeModal getFilter={getFilterStatisticsForRange} /> : null}

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