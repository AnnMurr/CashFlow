import { MONTH } from "../consts/index";

type DatesInRangeGetter = ({
    startDate,
    endDate
}: {
    startDate: Date | string | null;
    endDate: Date | string | null;
}) => Date[];

export const getCurrentDate = (date: Date): string => {
    const newDate = new Date(date);
    const day = newDate.getDate().toString().padStart(2, '0');
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const year = newDate.getFullYear();
    const hours = newDate.getHours().toString().padStart(2, '0');
    const minutes = newDate.getMinutes().toString().padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

export const getYear = (): number => {
    const newDate = new Date();
    const year = newDate.getFullYear();

    return year;
}

export const getMonth = (): number => {
    const newDate = new Date();
    const month = +(newDate.getMonth() + 1).toString().padStart(2);

    return month;
}

export const getWeek = (): Array<string> => {
    const currentDate = new Date();
    const dayOfWeek = (currentDate.getDay() + 6) % 7;
    const startOfWeek = new Date(currentDate);
    const endOfWeek = new Date(currentDate);

    startOfWeek.setDate(currentDate.getDate() - dayOfWeek);

    endOfWeek.setDate(currentDate.getDate() + (6 - dayOfWeek));

    const dates = [];

    for (let date = new Date(startOfWeek); date <= endOfWeek; date.setDate(date.getDate() + 1)) {
        dates.push(formatToDDMMYYYY(new Date(date)));
    }

    return dates;
}

export const getCurrentMonthAndYear = (): string => {
    const date = new Date();
    const currentMonth = MONTH[date.getMonth()];
    const currentYear = date.getFullYear();

    return `${currentMonth} ${currentYear}`;
};

export const getDatesInRange: DatesInRangeGetter = ({ startDate, endDate }) => {
    if (!startDate || !endDate) return [];

    const start = typeof startDate === 'string' ? parseCustomDate(startDate) : new Date(startDate);
    const end = typeof endDate === 'string' ? parseCustomDate(endDate) : new Date(endDate);

    const dates: Date[] = [];
    let currentDate = new Date(start);

    while (currentDate <= end) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}

export const parseEuropeanDate = (dateString: string): Date => {
    const day = parseInt(dateString.substring(0, 2), 10);
    const month = parseInt(dateString.substring(3, 5), 10) - 1;
    const year = parseInt(dateString.substring(6, 10), 10);

    return new Date(year, month, day);
}

export const formatToDDMMYYYY = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
}

function parseCustomDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('.').map(Number);
    return new Date(year, month - 1, day);
}

export function formatToDDMMYYYYRange(dates: (string | Date)[]): string {
    if (dates.length === 0) return '';

    const dateObjects = dates.map(date =>
        typeof date === 'string' ? parseCustomDate(date) : date
    );

    dateObjects.sort((a, b) => a.getTime() - b.getTime());

    const formatToDDMMYYYY = (date: Date): string =>
        `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;

    return `${formatToDDMMYYYY(dateObjects[0])} - ${formatToDDMMYYYY(dateObjects[dateObjects.length - 1])}`;
}

export const areDatesEqual = (date1: Date, date2: Date): boolean => {
    return new Date(date1).setHours(0, 0, 0, 0) === new Date(date2).setHours(0, 0, 0, 0);
}

export const areMonthAndYearEqual = (monthYearString: string, dateToCompare: string | Date): boolean => {
    const [monthName, year] = monthYearString.split(' ');
    const monthIndex = MONTH.indexOf(monthName);

    if (monthIndex === -1) {
        throw new Error('Invalid month name');
    }

    const dateToCompareObj = typeof dateToCompare === 'string' ? new Date(dateToCompare) : dateToCompare;

    return (
        monthIndex === dateToCompareObj.getMonth() &&
        Number(year) === dateToCompareObj.getFullYear()
    );
};

export const areYearEqual = (year: number, dateToCompare: Date): boolean => {
    const date = new Date(dateToCompare);
    const yearFromDate = date.getFullYear();

    return yearFromDate === year;
}