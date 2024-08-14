import { FC, useContext, useEffect, useState } from "react";
import { SubBar } from "../../shared/subBar/subBar";
import { Body } from "../../shared/body/body";
import { Header } from "./components/header/header";
import { List } from "./components/list/list";
import { useAppDispatch, useAppSelector } from "../../../redux/store/store";
import { DatePickerModal } from "./components/datePickerModal/datePickerModal";
import { DarkBackground } from "../../shared/darkBackground/darkBackground";
import { RootState } from "../../../redux/reducers/userStorageReduser/types";
import { AlertComponent, AlertComponentProps } from "../../shared/alert/alert";
import { MonthSelectModal } from "./components/monthSelectModal/monthSelectModal";
import { YearSelectModal } from "./components/yearSelectModal/yearSelectModal";
import { DateRangeModal } from "./components/dateRangeModal/dateRangeModal";
import { getDataForStatistic, getFilterStatisticsForDay, getFilterStatisticsForMonth, getFilterStatisticsForRange, getFilterStatisticsForWeek, getFilterStatisticsForYear } from "../../../utils/statisticalDataUtils";
import { setChosenCategoryStatistic, setChosenFilter, setIsEditingData } from "../../../redux/reducers/userStorageReduser/userStorageReduser";
import { DeleteFinancesModal } from "./components/deleteFinancesModal/deleteFinancesModal";
import { EmptyState } from "./components/emptyState/emptyState";
import { ThemeContextType } from "../../../contexts/themeContext/types";
import { ThemeContext } from "../../../contexts/themeContext/themeContext";
import { Spinner } from "../../../components/shared/spinner/spinner";
import { Container, Wrapper, LoadingInner } from "./styledStatistics";

export const Statistics: FC = () => {
    const [isAlertActive, setIsAlertActive] = useState<AlertComponentProps | null>(null);
    const [chosenFilterType, setChosenFilterType] = useState<string | null>(null);
    const [isDatePickerModal, setIsDatePickerModal] = useState<boolean>(false);
    const [isMonthSelectModal, setIsMonthSelectModal] = useState<boolean>(false);
    const [isYearSelectModal, setIsYearSelectModal] = useState<boolean>(false);
    const [isDateRangeModal, setIsDateRangeModal] = useState<boolean>(false);
    const [isDeleteFinancesModal, setIsDeleteFinancesModal] = useState<boolean>(false);
    const [statisticType, setStatisticType] = useState<"expenses" | "income">("expenses");
    const [chosenDate, setChosenDate] = useState<string | null>(null);
    const [month, setMonth] = useState<string | null>(null);
    const [chosenYear, setChosenYear] = useState<string | null>(null);

    const [selectedStartDate, setSelectedStartDate] = useState<string | null>(null);
    const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
    const { statisticalData, storageData } = useAppSelector((state: RootState) => state.storage);
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const dispatch = useAppDispatch();

    const currentSetIsModal = isDatePickerModal
        ? setIsDatePickerModal
        : isMonthSelectModal
            ? setIsMonthSelectModal
            : isYearSelectModal
                ? setIsYearSelectModal
                : isDateRangeModal
                    ? setIsDateRangeModal
                    : setIsDeleteFinancesModal;

    const currentIsModal = isDatePickerModal || isMonthSelectModal || isYearSelectModal || isDateRangeModal || isDeleteFinancesModal;

    useEffect(() => {
        chosenFilterType === "Week" &&
            getFilterStatisticsForWeek(statisticalData, setIsAlertActive, chosenFilterType, dispatch);
    }, [chosenFilterType]);

    useEffect(() => {
        getDataForStatistic("expenses", dispatch);

        return () => {
            dispatch(setChosenCategoryStatistic(null));
            dispatch(setChosenFilter(null));
            dispatch(setIsEditingData(true));
        }
    }, []);

    useEffect(() => { getDataForStatistic(statisticType, dispatch) }, [statisticType]);

    return (
        <Body>
            <section>
                {!storageData ?
                    <LoadingInner>
                        <Spinner size={40} height={3} />
                    </LoadingInner>
                    : (storageData?.data.expenses.length > 0 || storageData?.data.income.length > 0) ?
                        <Container>
                            <Wrapper themestyles={themeContext.themeStyles}>
                                <SubBar />
                                <Header
                                    setIsDeleteFinancesModal={setIsDeleteFinancesModal}
                                    statisticType={statisticType}
                                    setStatisticType={setStatisticType}
                                    setChosenFilterType={setChosenFilterType}
                                    openDatePickerModal={setIsDatePickerModal}
                                    openMonthSelectModal={setIsMonthSelectModal}
                                    openYearSelectModal={setIsYearSelectModal}
                                    openDateRangeModal={setIsDateRangeModal} />
                                <List
                                    statisticType={statisticType}
                                    setIsAlertActive={setIsAlertActive} />
                                {isDatePickerModal ?
                                    <DatePickerModal
                                        applyDate={() => getFilterStatisticsForDay(
                                            chosenDate,
                                            statisticalData,
                                            setIsAlertActive,
                                            chosenFilterType,
                                            dispatch,
                                            setIsDatePickerModal)}
                                        setChosenDate={setChosenDate}
                                        setIsDatePickerModal={setIsDatePickerModal} />
                                    : null}
                                {isMonthSelectModal ?
                                    <MonthSelectModal
                                        setMonth={setMonth}
                                        month={month}
                                        applyMonth={() => getFilterStatisticsForMonth(
                                            month,
                                            statisticalData,
                                            setIsAlertActive,
                                            chosenFilterType,
                                            dispatch,
                                            setIsMonthSelectModal)}
                                        setIsMonthSelectModal={setIsMonthSelectModal} />
                                    : null}
                                {isYearSelectModal ?
                                    <YearSelectModal
                                        applyYear={() => getFilterStatisticsForYear(
                                            chosenYear,
                                            statisticalData,
                                            setIsAlertActive,
                                            chosenFilterType,
                                            dispatch,
                                            setIsYearSelectModal)}
                                        setChosenYear={setChosenYear}
                                        setIsYearSelectModal={setIsYearSelectModal} />
                                    : null}
                                {isDateRangeModal ?
                                    <DateRangeModal
                                        applyDateRange={() => getFilterStatisticsForRange(
                                            { startDate: selectedStartDate, endDate: selectedEndDate },
                                            statisticalData,
                                            setIsAlertActive,
                                            chosenFilterType,
                                            dispatch,
                                            setIsDateRangeModal)}
                                        setSelectedStartDate={setSelectedStartDate}
                                        setSelectedEndDate={setSelectedEndDate}
                                        setIsDateRangeModal={setIsDateRangeModal} />
                                    : null}
                                {isDeleteFinancesModal ?
                                    <DeleteFinancesModal
                                        statisticType={statisticType}
                                        setIsAlertActive={setIsAlertActive}
                                        setIsDeleteFinancesModal={setIsDeleteFinancesModal} />
                                    : null}
                                {currentIsModal ?
                                    <DarkBackground
                                        setIsModalActive={currentSetIsModal}
                                        isModalActive={currentIsModal} />
                                    : null}

                                {isAlertActive ? <AlertComponent type={isAlertActive.type} text={isAlertActive.text} /> : null}
                            </Wrapper>
                        </Container>
                        :
                        <Container>
                            <SubBar />
                            <EmptyState />
                        </Container>}
            </section >
        </Body>
    )
}