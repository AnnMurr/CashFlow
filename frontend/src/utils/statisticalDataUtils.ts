import { AlertComponentProps } from "../components/shared/alert/alert";
import { ItemType, ItemsType, StatisticalDataType, UserStorageDataType } from "../redux/reducers/userStorageReduser/types";
import { showAlert } from "./showAlert";
import { getCurrentDate, getWeek, parseEuropeanDate } from "./dateUtils";
import { MONTH } from "../consts/index";
import { AppDispatch } from "../redux/store/store";
import { getDataFromUserStore, setChosenFilter, setIsEditingData, setStatisticalData } from "../redux/reducers/userStorageReduser/userStorageReduser";
import { getDataFromLocalStorage } from "../storage/localStorage/localStorage";

type GetDataForStatisticType = (type: "expenses" | "income", dispatch: AppDispatch) => Promise<void>;

interface ProcessedStatisticalData {
    sortedStatisticalData: ItemType[];
    chosenDateStatisticalData: ItemType[];
}

type ProcessStatisticalDataType = (
    data: ItemsType,
    dateRange: string[],
    setIsAlertActive?: (value: AlertComponentProps | null) => void) =>
    ProcessedStatisticalData | null;

type BaseFilterStatisticsType = {
    statisticalData: StatisticalDataType | null;
    setIsAlertActive: (value: AlertComponentProps | null) => void;
    chosenFilterType: string | null;
    dispatch: AppDispatch;
    setIsModalActive?: (value: boolean) => void;
}

type GetFilterStatisticsForDayProps = BaseFilterStatisticsType & {
    chosenDate: string | null;
}

type GetFilterStatisticsForMonthParams = BaseFilterStatisticsType & {
    chosenDate: string | null;
}

type GetFilterStatisticsForYearParams = BaseFilterStatisticsType & {
    chosenYear: string | null;
}

type GetFilterStatisticsForRangeParams = BaseFilterStatisticsType & {
    chosenDate: { startDate: string | null; endDate: string | null };
}

type GetFilterStatisticsForDayType = (params: GetFilterStatisticsForDayProps) => void;
type GetFilterStatisticsForWeekType = (params: BaseFilterStatisticsType) => void;
type GetFilterStatisticsForMonthType = (params: GetFilterStatisticsForMonthParams) => void;
type GetFilterStatisticsForYearType = (params: GetFilterStatisticsForYearParams) => void;
type GetFilterStatisticsForRangeType = (params: GetFilterStatisticsForRangeParams) => void;

export const getDataForStatistic: GetDataForStatisticType = async (type, dispatch) => {
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

const processStatisticalData: ProcessStatisticalDataType = (
    data,
    dateRange,
    setIsAlertActive) => {
    const sortedStatisticalData: Array<ItemType> = [];
    const chosenDateStatisticalData: Array<ItemType> = [];

    dateRange.forEach(date => {
        data[date]?.forEach(item => {
            const existingItemIndex = sortedStatisticalData.findIndex((sortedItem) => sortedItem.category === item.category);
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
        setIsAlertActive && showAlert({ type: "error", text: "No data for this period" }, setIsAlertActive, 3000);
        return null;
    }
}

export const getFilterStatisticsForDay: GetFilterStatisticsForDayType = ({
    chosenDate,
    statisticalData,
    setIsAlertActive,
    chosenFilterType,
    dispatch,
    setIsModalActive }) => {
    if (!statisticalData || !chosenDate) {
        showAlert({ type: "warning", text: "Choose date" }, setIsAlertActive, 3000);
        return;
    };

    const filteredStatisticalData = statisticalData.data[chosenDate];
    if (!filteredStatisticalData) {
        showAlert({ type: "error", text: "No data for this day" }, setIsAlertActive, 3000);
        return;
    }

    const result = processStatisticalData(statisticalData.data, [chosenDate], setIsAlertActive);

    if (result) {
        const { sortedStatisticalData, chosenDateStatisticalData } = result;
        setIsModalActive && setIsModalActive(false);
        dispatch(setIsEditingData(false));
        dispatch(setChosenFilter({ isFilter: true, type: chosenFilterType, date: [chosenDate], data: chosenDateStatisticalData }));
        dispatch(setStatisticalData({ days: [chosenDate], data: { [chosenDate]: sortedStatisticalData } }));
    }
}

export const getFilterStatisticsForWeek: GetFilterStatisticsForWeekType = ({
    statisticalData,
    setIsAlertActive,
    chosenFilterType,
    dispatch }) => {
    if (!statisticalData) return;

    const week = getWeek();
    const result = processStatisticalData(statisticalData.data, week, setIsAlertActive);

    if (result) {
        const { sortedStatisticalData, chosenDateStatisticalData } = result;
        const weekRange = `${week[0]} - ${week[week.length - 1]}`;
        dispatch(setIsEditingData(false));
        dispatch(setChosenFilter({ isFilter: true, type: chosenFilterType, date: week, data: chosenDateStatisticalData }));
        dispatch(setStatisticalData({ days: [weekRange], data: { [weekRange]: sortedStatisticalData } }));
    }
}

export const getFilterStatisticsForMonth: GetFilterStatisticsForMonthType = ({
    chosenDate,
    statisticalData,
    setIsAlertActive,
    chosenFilterType,
    dispatch,
    setIsModalActive }) => {
    if (!statisticalData || !chosenDate) {
        showAlert({ type: "warning", text: "Choose date" }, setIsAlertActive, 3000);
        return;
    }

    const monthNumber = `0${MONTH.indexOf(chosenDate.split(" ")[0]) + 1}`;
    const dateRange = statisticalData.days.filter((date) => date.split(".")[1] === monthNumber);

    if (dateRange.length === 0) {
        showAlert({ type: "error", text: "No data for this month" }, setIsAlertActive, 3000);
        return;
    }

    const result = processStatisticalData(statisticalData.data, dateRange, setIsAlertActive);

    if (result) {
        const { sortedStatisticalData, chosenDateStatisticalData } = result;
        setIsModalActive && setIsModalActive(false);
        dispatch(setIsEditingData(false));
        dispatch(setChosenFilter({ isFilter: true, type: chosenFilterType, date: chosenDate, data: chosenDateStatisticalData }));
        dispatch(setStatisticalData({ days: [chosenDate], data: { [chosenDate]: sortedStatisticalData } }));
    }
}

export const getFilterStatisticsForYear: GetFilterStatisticsForYearType = ({
    chosenYear,
    statisticalData,
    setIsAlertActive,
    chosenFilterType,
    dispatch,
    setIsModalActive }) => {
    if (!statisticalData || !chosenYear) {
        showAlert({ type: "warning", text: "Choose date" }, setIsAlertActive, 3000);
        return;
    }

    const dateRange = statisticalData.days.filter((date) => date.split(".")[2] === chosenYear);

    if (dateRange.length === 0) {
        showAlert({ type: "error", text: "No data for this year" }, setIsAlertActive, 3000);
        return;
    }

    const result = processStatisticalData(statisticalData.data, dateRange, setIsAlertActive);

    if (result) {
        const { sortedStatisticalData, chosenDateStatisticalData } = result;
        setIsModalActive && setIsModalActive(false);
        dispatch(setIsEditingData(false));
        dispatch(setChosenFilter({ isFilter: true, type: chosenFilterType, date: chosenYear, data: chosenDateStatisticalData }));
        dispatch(setStatisticalData({ days: [chosenYear], data: { [chosenYear]: sortedStatisticalData } }));
    }
}

export const getFilterStatisticsForRange: GetFilterStatisticsForRangeType = ({
    chosenDate,
    statisticalData,
    setIsAlertActive,
    chosenFilterType,
    dispatch,
    setIsModalActive }) => {
    if (!statisticalData || !chosenDate.startDate || !chosenDate.endDate) {
        showAlert({ type: "warning", text: "Choose date" }, setIsAlertActive, 3000);
        return;
    }

    if (chosenDate.endDate < chosenDate.startDate) {
        showAlert({ type: "error", text: "End date must be greater than start date" }, setIsAlertActive, 3000);
        return;
    }

    const dateStart = parseEuropeanDate(chosenDate.startDate);
    const dateEnd = parseEuropeanDate(chosenDate.endDate);
    const dateRange = statisticalData.days.filter(item => {
        const itemDate = parseEuropeanDate(item);
        return itemDate >= dateStart && itemDate <= dateEnd;
    });

    if (dateRange.length === 0) {
        showAlert({ type: "error", text: "No data for this range" }, setIsAlertActive, 3000);
        return;
    }

    const result = processStatisticalData(statisticalData.data, dateRange, setIsAlertActive);

    if (result) {
        const { sortedStatisticalData, chosenDateStatisticalData } = result;
        const range = `${chosenDate.startDate} - ${chosenDate.endDate}`;
        setIsModalActive && setIsModalActive(false);
        dispatch(setIsEditingData(false));
        dispatch(setChosenFilter({ isFilter: true, type: chosenFilterType, date: range, data: chosenDateStatisticalData }));
        dispatch(setStatisticalData({ days: [range], data: { [range]: sortedStatisticalData } }));
    }
};