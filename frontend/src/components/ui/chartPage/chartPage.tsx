import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Body } from "../../shared/body/body";
import { SubBar } from "../../shared/subBar/subBar";
import { PieChartComponent } from "../../shared/pieChart/pieChart";
import { ChartDataType } from "../profilePage/types";
import { useAppSelector } from "../../../redux/store/store";
import { RootState } from "../../../redux/reducers/userStorageReduser/types";
import { Period, setChartDataForCustomPeriod } from "../../../utils/chartUtils";
import { formatToDDMMYYYY, formatToDDMMYYYYRange, getCurrentMonthAndYear, getDatesInRange, getWeek, getYear, parseEuropeanDate } from "../../../utils/dateUtils";
import { Filter } from "./components/filter/filter";
import { DatePickerModal } from "../statisticsPage/components/datePickerModal/datePickerModal";
import { AlertComponent, AlertComponentProps } from "../../../components/shared/alert/alert";
import { DarkBackground } from "../../shared/darkBackground/darkBackground";
import { MonthSelectModal } from "../statisticsPage/components/monthSelectModal/monthSelectModal";
import { YearSelectModal } from "../statisticsPage/components/yearSelectModal/yearSelectModal";
import { CURRENT_DATES } from "../../../consts";
import { DateRangeModal } from "../statisticsPage/components/dateRangeModal/dateRangeModal";
import { Container, Wrapper } from "./styledChartPage";

type CurrentDateKeys = 'dateDay' | 'datesWeek' | 'currentYear' | 'currentMonth';

export const ChartPage: FC = () => {
    const location = useLocation();
    const [chartData, setChartData] = useState<Array<ChartDataType> | null>(null);
    const [diapason, setDiapason] = useState<Period | null>(null);
    const [isAlertActive, setIsAlertActive] = useState<AlertComponentProps | null>(null);
    const [isDatePickerModal, setIsDatePickerModal] = useState<boolean>(false);
    const [isMonthSelectModal, setIsMonthSelectModal] = useState<boolean>(false);
    const [isYearSelectModal, setIsYearSelectModal] = useState<boolean>(false);
    const [isDateRangeModal, setIsDateRangeModal] = useState<boolean>(false);
    const [chosenDate, setChosenDate] = useState<string | null>(null);
    const [displayDate, setDisplayDate] = useState<string | null>(null);
    const [selectedStartDate, setSelectedStartDate] = useState<string | null>(null);
    const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
    const { storageData } = useAppSelector((state: RootState) => state.storage);

    const diapasonToDateKeyMap: Record<Period, CurrentDateKeys> = {
        day: 'dateDay',
        week: 'datesWeek',
        month: 'currentMonth',
        year: 'currentYear',
    };

    useEffect(() => {
        setDiapason(location.state.key);
    }, [location]);

    useEffect(() => {
        const setDataForChart = () => {
            if (!storageData || !diapason) return;

            const dateKey = diapasonToDateKeyMap[diapason as Period];
            const currentRange = CURRENT_DATES[dateKey];

            currentRange &&
                setChartDataForCustomPeriod(
                    "expenses",
                    currentRange,
                    diapason,
                    storageData,
                    setChartData,
                    setIsDatePickerModal);
        };

        setDataForChart();
    }, [storageData, diapason]);

    useEffect(() => {
        if (!chosenDate) {
            const key = location.state.key;

            const dateMap: Record<typeof key, string> = {
                day: formatToDDMMYYYY(new Date()),
                month: getCurrentMonthAndYear(),
                year: getYear().toString(),
                week: formatToDDMMYYYYRange(getWeek())
            };

            const date = dateMap[key];
            if (date) {
                setChosenDate(date);
                setDisplayDate(date);
            }
        }
    }, [location.state.key, chosenDate]);

    return (
        <Body>
            <section>
                <Container>
                    <Wrapper>
                        <SubBar />
                        <Filter
                            openDatePickerModal={setIsDatePickerModal}
                            openMonthSelectModal={setIsMonthSelectModal}
                            openYearSelectModal={setIsYearSelectModal}
                            openDateRangeModal={setIsDateRangeModal}
                            diapason={diapason}
                            displayDate={displayDate} />
                        <div>
                            {chartData && <PieChartComponent data={chartData} />}
                        </div>
                        {isDatePickerModal ?
                            <>
                                {chosenDate && storageData &&
                                    <DatePickerModal
                                        applyDate={() => {
                                            setDisplayDate(chosenDate);
                                            setChartDataForCustomPeriod(
                                                "expenses",
                                                [new Date(parseEuropeanDate(chosenDate))],
                                                "day",
                                                storageData,
                                                setChartData,
                                                setIsDatePickerModal)
                                        }}
                                        setIsDatePickerModal={setIsDatePickerModal}
                                        setChosenDate={setChosenDate} />}
                                <DarkBackground
                                    setIsModalActive={setIsDatePickerModal}
                                    isModalActive={isDatePickerModal} />
                            </>
                            : null}
                        {isMonthSelectModal ?
                            <>
                                {chosenDate && storageData &&
                                    <MonthSelectModal
                                        applyMonth={() => {
                                            setDisplayDate(chosenDate);
                                            setChartDataForCustomPeriod(
                                                "expenses",
                                                +chosenDate,
                                                "month",
                                                storageData,
                                                setChartData,
                                                setIsMonthSelectModal)
                                        }}
                                        setIsMonthSelectModal={setIsMonthSelectModal}
                                        setMonth={setChosenDate}
                                        month={chosenDate}
                                    />}
                                <DarkBackground
                                    setIsModalActive={setIsMonthSelectModal}
                                    isModalActive={isMonthSelectModal} />
                            </>
                            : null}
                        {isYearSelectModal ?
                            <>
                                {chosenDate && storageData && <YearSelectModal
                                    applyYear={() => {
                                        setDisplayDate(chosenDate);
                                        setChartDataForCustomPeriod(
                                            "expenses",
                                            +chosenDate,
                                            "year",
                                            storageData,
                                            setChartData,
                                            setIsYearSelectModal)
                                    }}
                                    setChosenYear={setChosenDate}
                                    setIsYearSelectModal={setIsYearSelectModal} />}
                                <DarkBackground
                                    setIsModalActive={setIsYearSelectModal}
                                    isModalActive={isYearSelectModal} />
                            </>
                            : null}
                        {isDateRangeModal ?
                            <>
                                {chosenDate && storageData &&
                                    <DateRangeModal
                                        applyDateRange={() => {
                                            setDisplayDate(`${selectedStartDate} - ${selectedEndDate}`);
                                            setChartDataForCustomPeriod(
                                                "expenses",
                                                getDatesInRange({ startDate: selectedStartDate, endDate: selectedEndDate }),
                                                "week",
                                                storageData,
                                                setChartData,
                                                setIsDateRangeModal)
                                        }}
                                        setSelectedStartDate={setSelectedStartDate}
                                        setSelectedEndDate={setSelectedEndDate}
                                        setIsDateRangeModal={setIsDateRangeModal} />}
                                <DarkBackground
                                    setIsModalActive={setIsDateRangeModal}
                                    isModalActive={isDateRangeModal} />
                            </>
                            : null}
                        {isAlertActive ? <AlertComponent type={isAlertActive.type} text={isAlertActive.text} /> : null}
                    </Wrapper>
                </Container>
            </section>
        </Body>
    )
}