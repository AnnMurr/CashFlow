import { ChartDataObjectType } from "../components/ui/profilePage/types";
import { areDatesEqual, areMonthEqual, areYearEqual, getMonth, getWeek, getYear, parseEuropeanDate } from "./getCurrentDate";
import { Transaction, UserStorageDataType } from "../redux/reducers/userStorageReduser/types";

const filterChartData = (
    storageData: UserStorageDataType,
    financeType: "expenses" | "income",
    date: Array<Date> | number,
    period: string) => {

    if (period === 'day' && Array.isArray(date)) {
        return storageData?.data[financeType]
            .filter(item => date.some(dateItem => areDatesEqual(dateItem, item.date)));
    } else if (period === 'week' && Array.isArray(date)) {
        return storageData?.data[financeType]
            .filter(item => date.some(dateItem => areDatesEqual(dateItem, item.date)))
    } else if (period === 'month' && typeof date === "number") {
        return storageData?.data[financeType].filter((item) => {
            return areMonthEqual(date, item.date);
        });
    } else if (period === 'year' && typeof date === "number") {
        return storageData?.data[financeType].filter((item) => {
            return areYearEqual(date, item.date);
        });
    }
}

export const setChartDataByPeriod = (
    financeType: "expenses" | "income",
    storageData: UserStorageDataType,
    setChartData: (value: ChartDataObjectType | null) => void) => {
    const timePeriods = ['day', 'week', 'month', 'year'];
    const dateDay = [new Date()];
    const datesWeek = getWeek().map(parseEuropeanDate);
    const data: ChartDataObjectType = {};

    timePeriods.forEach(period => {
        let filteredData: Transaction[] | undefined = [];

        if (period === 'day') {
            filteredData = filterChartData(storageData, financeType, dateDay, period);
        } else if (period === 'week') {
            filteredData = filterChartData(storageData, financeType, datesWeek, period);
        } else if (period === 'month') {
            const currentMonth = getMonth();
            filteredData = filterChartData(storageData, financeType, currentMonth, period);
        } else if (period === 'year') {
            const currentYear = getYear();
            filteredData = filterChartData(storageData, financeType, currentYear, period);
        }

        const rangeData = filteredData !== undefined && filteredData.reduce((acc, item) => {
            const existingCategory = acc.find(entry => entry.label === item.category);
            if (existingCategory) {
                existingCategory.value += item.sum;
            } else {
                acc.push({ label: item.category, value: item.sum });
            }
            return acc;
        }, [] as { label: string, value: number }[]);

        if (rangeData && rangeData !== undefined) {
            data[period] = rangeData;
        }
    });

    setChartData(data);
}