import { FC, useEffect, useRef, useState } from "react";
import { SubBar } from "../../shared/subBar/subBar";
import { Header } from "./components/header/header";
import { List } from "./components/list/list";
import { useAppDispatch, useAppSelector } from "../../../redux/store/store";
import { DatePikerModal } from "./components/datePikerModal/datePikerModal";
import { DarkBackground } from "../../shared/darkBackground/darkBackground";
import { ItemType, ItemsType, RootState } from "../../../redux/reducers/userStorageReduser/types";
import { setChosenFilter, setIsEditingData, setStatisticalData } from "../../../redux/reducers/userStorageReduser/userStorageReduser";
import { AlertComponent, AlertComponentProps } from "../../shared/alert/alert";
import { getAlert } from "../../../utils/getAlert";
import { getWeek } from "../../../utils/getCurrentDate";
import { Container, Wrapper } from "./styledStatistics";

export const Statistics: FC = () => {
    const [isAlertActive, setIsAlertActive] = useState<AlertComponentProps | null>(null);
    const [items, setItems] = useState<ItemsType | null>(null);
    const [days, setDays] = useState<Array<string> | null>(null);
    const [chosenFilterType, setChosenFilterType] = useState<string | null>(null);
    const [isDatePikerModal, setIsDatePikerModal] = useState<boolean>(false);
    const darkBackgroundRef = useRef<HTMLDivElement>(null);
    const { statisticalData } = useAppSelector((state: RootState) => state.storage);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleClickOutsideModal = (event: MouseEvent) => {
            if (darkBackgroundRef.current && darkBackgroundRef.current.contains(event.target as HTMLElement)) {
                isDatePikerModal && setIsDatePikerModal(false);
            }
        }

        if (isDatePikerModal)
            window.addEventListener("click", handleClickOutsideModal);

        return () => {
            window.removeEventListener("click", handleClickOutsideModal);
        };
    }, [isDatePikerModal]);

    const getFilterStatisticsForDay = (chosenDate: string | null) => {
        if (statisticalData && chosenDate) {
            const filteredStatisticalData = statisticalData?.data[chosenDate];

            if (filteredStatisticalData) {
                const chosenDateStatisticalData: Array<ItemType> = [];
                const sortedStatisticalData: Array<ItemType> = [];

                filteredStatisticalData.forEach(item => {
                    const existingItemIndex = sortedStatisticalData.findIndex((x) => x.category === item.category);
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

                if (sortedStatisticalData) {
                    dispatch(setIsEditingData(false));
                    setIsDatePikerModal(false);
                    dispatch(setChosenFilter({ isFilter: true, type: chosenFilterType, date: [chosenDate], data: chosenDateStatisticalData }));
                    dispatch(setStatisticalData({ days: [chosenDate], data: { [chosenDate]: sortedStatisticalData } }));
                }
            } else {
                getAlert({ type: "error", text: "No data for this day" }, setIsAlertActive, 3000);
            }
        }
    }

    const getFilterStatisticsForWeek = () => {
        const week = getWeek();
        const sortedStatisticalData: Array<ItemType> = [];
        const chosenDateStatisticalData: Array<ItemType> = [];

        if (statisticalData) {
            for (const key in statisticalData.data) {
                if (week.includes(key)) {
                    statisticalData.data[key].forEach(item => {
                        const existingItemIndex = sortedStatisticalData.findIndex((x) => x.category === item.category);
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
                }
            }
        }

        if (sortedStatisticalData) {
            const weekRange = [`${week[0]} - ${week[week.length - 1]}`];
            dispatch(setIsEditingData(false));
            dispatch(setChosenFilter({ isFilter: true, type: chosenFilterType, date: week, data: chosenDateStatisticalData }));
            dispatch(setStatisticalData({ days: weekRange, data: { weekRange: sortedStatisticalData } }));
        }
    }

    useEffect(() => {
        chosenFilterType === "Week" && getFilterStatisticsForWeek()
    }, [chosenFilterType])

    return (
        <section>
            <Container>
                <Wrapper>
                    <SubBar />
                    <Header setChosenFilterType={setChosenFilterType} openDatePikerModal={setIsDatePikerModal} />
                    <List
                        setIsAlertActive={setIsAlertActive}
                        setItems={setItems}
                        items={items}
                        setDays={setDays}
                        days={days} />
                    {isDatePikerModal ?
                        <>
                            <DatePikerModal getFilterStatisticsForDay={getFilterStatisticsForDay} />
                            <DarkBackground type={"clickable"} darkBackgroundRef={darkBackgroundRef} />
                        </>
                        : null}
                    {isAlertActive ?
                        <AlertComponent type={isAlertActive.type} text={isAlertActive.text} />
                        : null}
                </Wrapper>
            </Container>
        </section >
    )
}