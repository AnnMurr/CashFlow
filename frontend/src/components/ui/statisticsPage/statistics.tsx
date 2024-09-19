import { FC, useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store/store";
import { RootState } from "../../../redux/reducers/userStorageReduser/types";
import { AlertComponent, AlertComponentProps } from "../../shared/alert/alert";
import { setChosenCategoryStatistic, setChosenFilter, setIsEditingData } from "../../../redux/reducers/userStorageReduser/userStorageReduser";
import { ThemeContextType } from "../../../contexts/themeContext/types";
import { ThemeContext } from "../../../contexts/themeContext/themeContext";
import {
    getDataForStatistic,
    getFilterStatisticsForDay,
    getFilterStatisticsForMonth,
    getFilterStatisticsForRange,
    getFilterStatisticsForWeek,
    getFilterStatisticsForYear
} from "../../../utils/statisticalDataUtils";
import {
    Body,
    DarkBackground,
    DatePickerModal,
    DateRangeModal,
    DeleteFinancesModal,
    EmptyState,
    Header,
    List,
    MonthSelectModal,
    Spinner,
    SubBar,
    YearSelectModal
} from ".";

import { Container, Wrapper, LoadingInner, Table } from "./styledStatistics";

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
            getFilterStatisticsForWeek({ statisticalData, setIsAlertActive, chosenFilterType, dispatch });
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
                <Container>
                    <Wrapper>
                        <SubBar />
                        {!storageData ?
                            (<LoadingInner>
                                <Spinner size={40} height={3} />
                            </LoadingInner>) :
                            (storageData.data.expenses.length > 0 || storageData.data.income.length > 0) ?
                                (<Table themestyles={themeContext.themeStyles}>
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
                                </Table>)
                                :
                                (<Container>
                                    <SubBar />
                                    <EmptyState />
                                </Container>)}
                        {isDatePickerModal ?
                            <DatePickerModal
                                applyDate={() => getFilterStatisticsForDay({
                                    chosenDate,
                                    statisticalData,
                                    setIsAlertActive,
                                    chosenFilterType,
                                    dispatch,
                                    setIsModalActive: setIsDatePickerModal
                                })}
                                setChosenDate={setChosenDate}
                                setIsDatePickerModal={setIsDatePickerModal} />
                            : null}
                        {isMonthSelectModal ?
                            <MonthSelectModal
                                setMonth={setMonth}
                                month={month}
                                applyMonth={() => getFilterStatisticsForMonth({
                                    chosenDate: month,
                                    statisticalData,
                                    setIsAlertActive,
                                    chosenFilterType,
                                    dispatch,
                                    setIsModalActive: setIsMonthSelectModal
                                })}
                                setIsMonthSelectModal={setIsMonthSelectModal} />
                            : null}
                        {isYearSelectModal ?
                            <YearSelectModal
                                applyYear={() => getFilterStatisticsForYear({
                                    chosenYear,
                                    statisticalData,
                                    setIsAlertActive,
                                    chosenFilterType,
                                    dispatch,
                                    setIsModalActive: setIsYearSelectModal
                                })}
                                setChosenYear={setChosenYear}
                                setIsYearSelectModal={setIsYearSelectModal} />
                            : null}
                        {isDateRangeModal ?
                            <DateRangeModal
                                applyDateRange={() => getFilterStatisticsForRange({
                                    chosenDate: { startDate: selectedStartDate, endDate: selectedEndDate },
                                    statisticalData,
                                    setIsAlertActive,
                                    chosenFilterType,
                                    dispatch,
                                    setIsModalActive: setIsDateRangeModal
                                })}
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
            </section >
        </Body>
    )
}