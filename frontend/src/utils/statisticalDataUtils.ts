import { AlertComponentProps } from "../components/shared/alert/alert";
import { ItemType, ItemsType, StatisticalDataType } from "../redux/reducers/userStorageReduser/types";
import { getAlert } from "./getAlert";
import { getWeek, parseEuropeanDate } from "./getCurrentDate";
import { MONTH } from "../consts/index";
import { AppDispatch } from "../redux/store/store";
import { setChosenFilter, setIsEditingData, setStatisticalData } from "../redux/reducers/userStorageReduser/userStorageReduser";

const processStatisticalData = (
    data: ItemsType,
    dateRange: string[],
    setIsAlertActive: (value: AlertComponentProps | null) => void) => {

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
        getAlert({ type: "error", text: "No data for this period" }, setIsAlertActive, 3000);
        return null;
    }
};

export const getFilterStatisticsForDay = (
    chosenDate: string | null,
    statisticalData: StatisticalDataType | null,
    setIsAlertActive: (value: AlertComponentProps | null) => void,
    chosenFilterType: string | null,
    dispatch: AppDispatch,
    setIsDatePikerModal: (value: boolean) => void) => {
    if (!statisticalData || !chosenDate) return;

    const filteredStatisticalData = statisticalData.data[chosenDate];
    if (!filteredStatisticalData) {
        getAlert({ type: "error", text: "No data for this day" }, setIsAlertActive, 3000);
        return;
    }

    const result = processStatisticalData(statisticalData.data, [chosenDate], setIsAlertActive);

    if (result) {
        const { sortedStatisticalData, chosenDateStatisticalData } = result;
        dispatch(setIsEditingData(false));
        setIsDatePikerModal(false);
        dispatch(setChosenFilter({ isFilter: true, type: chosenFilterType, date: [chosenDate], data: chosenDateStatisticalData }));
        dispatch(setStatisticalData({ days: [chosenDate], data: { [chosenDate]: sortedStatisticalData } }));
    }
};

export const getFilterStatisticsForWeek = (
    statisticalData: StatisticalDataType | null,
    setIsAlertActive: (value: AlertComponentProps | null) => void,
    chosenFilterType: string | null,
    dispatch: AppDispatch) => {
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
};

export const getFilterStatisticsForMonth = (
    chosenDate: string | null,
    statisticalData: StatisticalDataType | null,
    setIsAlertActive: (value: AlertComponentProps | null) => void,
    chosenFilterType: string | null,
    dispatch: AppDispatch,
    setIsMonthSelectModal: (value: boolean) => void) => {
    if (!statisticalData || !chosenDate) return;

    const monthNumber = `0${MONTH.indexOf(chosenDate.split(" ")[0]) + 1}`;
    const dateRange = statisticalData.days.filter((date) => date.split(".")[1] === monthNumber);

    if (dateRange.length === 0) {
        getAlert({ type: "error", text: "No data for this month" }, setIsAlertActive, 3000);
        return;
    }

    const result = processStatisticalData(statisticalData.data, dateRange, setIsAlertActive);

    if (result) {
        const { sortedStatisticalData, chosenDateStatisticalData } = result;
        setIsMonthSelectModal(false);
        dispatch(setIsEditingData(false));
        dispatch(setChosenFilter({ isFilter: true, type: chosenFilterType, date: chosenDate, data: chosenDateStatisticalData }));
        dispatch(setStatisticalData({ days: [chosenDate], data: { [chosenDate]: sortedStatisticalData } }));
    }
};

export const getFilterStatisticsForYear = (
    chosenYear: string | null,
    statisticalData: StatisticalDataType | null,
    setIsAlertActive: (value: AlertComponentProps | null) => void,
    chosenFilterType: string | null,
    dispatch: AppDispatch,
    setIsYearSelectModal: (value: boolean) => void) => {
    if (!statisticalData || !chosenYear) return;

    const dateRange = statisticalData.days.filter((date) => date.split(".")[2] === chosenYear);

    if (dateRange.length === 0) {
        getAlert({ type: "error", text: "No data for this year" }, setIsAlertActive, 3000);
        return;
    }

    const result = processStatisticalData(statisticalData.data, dateRange, setIsAlertActive);

    if (result) {
        const { sortedStatisticalData, chosenDateStatisticalData } = result;
        setIsYearSelectModal(false);
        dispatch(setIsEditingData(false));
        dispatch(setChosenFilter({ isFilter: true, type: chosenFilterType, date: chosenYear, data: chosenDateStatisticalData }));
        dispatch(setStatisticalData({ days: [chosenYear], data: { [chosenYear]: sortedStatisticalData } }));
    }
};

export const getFilterStatisticsForRange = (
    chosenDate: { startDate: string | null; endDate: string | null },
    statisticalData: StatisticalDataType | null,
    setIsAlertActive: (value: AlertComponentProps | null) => void,
    chosenFilterType: string | null,
    dispatch: AppDispatch,
    setIsDateRangeModal: (value: boolean) => void) => {
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

    const result = processStatisticalData(statisticalData.data, dateRange, setIsAlertActive);

    if (result) {
        const { sortedStatisticalData, chosenDateStatisticalData } = result;
        const range = `${chosenDate.startDate} - ${chosenDate.endDate}`;
        setIsDateRangeModal(false);
        dispatch(setIsEditingData(false));
        dispatch(setChosenFilter({ isFilter: true, type: chosenFilterType, date: range, data: chosenDateStatisticalData }));
        dispatch(setStatisticalData({ days: [range], data: { [range]: sortedStatisticalData } }));
    }
};