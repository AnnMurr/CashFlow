import { ChartDataObjectType, ChartDataType } from "../components/ui/profilePage/types";
import { areDatesEqual, areMonthAndYearEqual, areYearEqual } from "./dateUtils";
import { Transaction, UserStorageDataType } from "../redux/reducers/userStorageReduser/types";
import { CHART_TIME_PERIODS, CURRENT_DATES } from "../consts";

export type Period = 'day' | 'week' | 'month' | 'year';
type DateRange = Date | Date[] | string | number;

type FilterChartTransactions = (
    storageData: UserStorageDataType,
    financeType: "expenses" | "income",
    date: Array<Date> | number | string,
    period: string) => Transaction[] | undefined;

type DataFilterByPeriod = (period: string,
    storageData: UserStorageDataType,
    financeType: "expenses" | "income",
    dateDay: Array<Date>,
    datesWeek: Array<Date>,
    currentMonth: string,
    currentYear: number) => Transaction[] | undefined;

type ChartDataSetterByDate = (
    financeType: "expenses" | "income",
    storageData: UserStorageDataType,
    setChartData: (value: ChartDataObjectType | null) => void) => void;

type CustomPeriodChartDataSetter = (
    financeType: "expenses" | "income",
    dateRange: DateRange,
    period: Period,
    storageData: UserStorageDataType,
    setChartData: (value: Array<ChartDataType>) => void,
    setIsDatePickerModal: (value: boolean) => void) => void;

type CategoryDataAggregation = (filteredData: Transaction[] | undefined) => false | ChartDataType[];

export const filterChartData: FilterChartTransactions = (storageData, financeType, date, period) => {
    if (period === 'day' && Array.isArray(date)) {
        return storageData?.data[financeType]
            .filter(item => date.some(dateItem => areDatesEqual(dateItem, item.date)));
    } else if (period === 'week' && Array.isArray(date)) {
        return storageData?.data[financeType]
            .filter(item => date.some(dateItem => areDatesEqual(dateItem, item.date)))
    } else if (period === 'month' && typeof date === "string") {
        return storageData?.data[financeType].filter((item) => {
            return areMonthAndYearEqual(date, item.date);
        });
    } else if (period === 'year' && typeof date === "number") {
        return storageData?.data[financeType].filter((item) => {
            return areYearEqual(date, item.date);
        });
    }
}

const getFilteredDataForPeriod: DataFilterByPeriod = (
    period, storageData, financeType, dateDay, datesWeek, currentMonth, currentYear) => {
    let dateParam: Array<Date> | string | number;

    switch (period) {
        case 'day':
            dateParam = dateDay;
            break;
        case 'week':
            dateParam = datesWeek;
            break;
        case 'month':
            dateParam = currentMonth;
            break;
        case 'year':
            dateParam = currentYear;
            break;
        default:
            throw new Error('Invalid period');
    }

    return filterChartData(storageData, financeType, dateParam, period);
}

export const aggregateCategoryData: CategoryDataAggregation = (filteredData = []) => {
    const rangeData = filteredData !== undefined && filteredData.reduce((acc, item) => {
        const existingCategory = acc.find(entry => entry.label === item.category);
        if (existingCategory) {
            existingCategory.value += item.sum;
        } else {
            acc.push({ label: item.category, value: item.sum });
        }
        return acc;
    }, [] as ChartDataType[]);

    return rangeData
}

export const setChartDataBySpecificDates: ChartDataSetterByDate = (
    financeType, storageData, setChartData) => {
    const data: ChartDataObjectType = {};

    CHART_TIME_PERIODS.forEach(period => {
        const filteredData = getFilteredDataForPeriod(
            period,
            storageData,
            financeType,
            CURRENT_DATES.dateDay,
            CURRENT_DATES.datesWeek,
            CURRENT_DATES.currentMonth,
            CURRENT_DATES.currentYear
        );

        const rangeData = aggregateCategoryData(filteredData)

        if (rangeData && rangeData !== undefined) {
            data[period] = rangeData;
        }
    });

    setChartData(data);
}


export const setChartDataForCustomPeriod: CustomPeriodChartDataSetter = (
    financeType, dateRange, period, storageData, setChartData, setIsDatePickerModal) => {
    const filteredData = getFilteredDataForPeriod(
        period,
        storageData,
        financeType,
        dateRange as Date[],
        dateRange as Date[],
        dateRange as string,
        dateRange as number,
    );

    const rangeData = aggregateCategoryData(filteredData);

    rangeData && setChartData(rangeData);
    setIsDatePickerModal(false);
}