import { AlertComponentProps } from "../components/shared/alert/alert";
import { ItemType, ItemsType, StatisticalDataType, UserStorageDataType } from "../redux/reducers/userStorageReduser/types";
import { getAlert } from "./getAlert";
import { getCurrentDate, getWeek, parseEuropeanDate } from "./getCurrentDate";
import { MONTH } from "../consts/index";
import { AppDispatch } from "../redux/store/store";
import { getDataFromUserStore, setChosenFilter, setIsEditingData, setStatisticalData } from "../redux/reducers/userStorageReduser/userStorageReduser";
import { getDataFromLocalStorage } from "../storage/localStorage/localStorage";

export const getDataForStatistic = async (type: "expenses" | "income", dispatch: AppDispatch) => {
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
    setIsDatePickerModal: (value: boolean) => void) => {
    if (!statisticalData || !chosenDate) {
        getAlert({ type: "warning", text: "Choose date" }, setIsAlertActive, 3000);
        return;
    };

    const filteredStatisticalData = statisticalData.data[chosenDate];
    if (!filteredStatisticalData) {
        getAlert({ type: "error", text: "No data for this day" }, setIsAlertActive, 3000);
        return;
    }

    const result = processStatisticalData(statisticalData.data, [chosenDate], setIsAlertActive);

    if (result) {
        const { sortedStatisticalData, chosenDateStatisticalData } = result;
        dispatch(setIsEditingData(false));
        setIsDatePickerModal(false);
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
    if (!statisticalData || !chosenDate) {
        getAlert({ type: "warning", text: "Choose date" }, setIsAlertActive, 3000);
        return;
    }

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
    if (!statisticalData || !chosenYear) {
        getAlert({ type: "warning", text: "Choose date" }, setIsAlertActive, 3000);
        return;
    }

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
    if (!statisticalData || !chosenDate.startDate || !chosenDate.endDate) {
        getAlert({ type: "warning", text: "Choose date" }, setIsAlertActive, 3000);
        return;
    }
    
    if (chosenDate.endDate < chosenDate.startDate) {
        getAlert({ type: "error", text: "End date must be greater than start date" }, setIsAlertActive, 3000);
        return;
    }

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