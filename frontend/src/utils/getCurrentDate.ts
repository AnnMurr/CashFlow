export const getMonth = () => {
    const newDate = new Date();
    const month = +(newDate.getMonth() + 1).toString().padStart(2);

    return month;
}

export const getYear = () => {
    const newDate = new Date();
    const year = newDate.getFullYear();

    return year;
}

export const getCurrentDate = (date: Date) => {
    const newDate = new Date(date);
    const day = newDate.getDate().toString().padStart(2, '0');
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const year = newDate.getFullYear();
    const hours = newDate.getHours().toString().padStart(2, '0');
    const minutes = newDate.getMinutes().toString().padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

export const parseEuropeanDate = (dateString: string) => {
    const day = parseInt(dateString.substring(0, 2), 10);
    const month = parseInt(dateString.substring(3, 5), 10) - 1;
    const year = parseInt(dateString.substring(6, 10), 10);

    return new Date(year, month, day);
}

export const areDatesEqual = (date1: Date, date2: Date): boolean => {
    return new Date(date1).setHours(0, 0, 0, 0) === new Date(date2).setHours(0, 0, 0, 0);
}

export const formatDate = (date: any) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
};

export const getWeek = () => {
    const currentDate = new Date();
    const dayOfWeek = (currentDate.getDay() + 6) % 7;
    const startOfWeek = new Date(currentDate);
    const endOfWeek = new Date(currentDate);

    startOfWeek.setDate(currentDate.getDate() - dayOfWeek);

    endOfWeek.setDate(currentDate.getDate() + (6 - dayOfWeek));

    const dates = [];

    for (let date = new Date(startOfWeek); date <= endOfWeek; date.setDate(date.getDate() + 1)) {
        dates.push(formatDate(new Date(date)));
    }

    return dates;
}

export const areMonthEqual = (month: number, dateToCompare: Date) => {
    const date = new Date(dateToCompare);
    const monthFromDate = date.getMonth() + 1;

    return monthFromDate === month;
}

export const areYearEqual = (year: number, dateToCompare: Date) => {
    const date = new Date(dateToCompare);
    const yearFromDate = date.getFullYear();

    return yearFromDate === year;
}