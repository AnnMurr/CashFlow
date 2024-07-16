import { FC, useEffect, useRef, useState } from "react";
import { SubBar } from "../../shared/subBar/subBar";
import { Header } from "./components/header/header";
import { List } from "./components/list/list";
import { useAppDispatch, useAppSelector } from "../../../redux/store/store";
import { DatePikerModal } from "./components/datePikerModal/datePikerModal";
import { DarkBackground } from "../../shared/darkBackground/darkBackground";
import { ItemType, ItemsType, RootState } from "../../../redux/reducers/userStorageReduser/types";
import { setIsEditingData } from "../../../redux/reducers/userStorageReduser/userStorageReduser";
import { AlertComponent, AlertComponentProps } from "../../shared/alert/alert";
import { getAlert } from "../../../utils/getAlert";
import { Container, Wrapper } from "./styledStatistics";

export const Statistics: FC = () => {
    const [isAlertActive, setIsAlertActive] = useState<AlertComponentProps | null>(null);
    const [items, setItems] = useState<ItemsType | null>(null);
    const [days, setDays] = useState<Array<string> | null>(null);
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

    const getFilterStatistics = (chosenDate: string | null) => {
        if (statisticalData && chosenDate) {
            const filteredStatisticalData = statisticalData?.data[chosenDate];

            if (filteredStatisticalData) {
                const sortedStatisticalData: Array<ItemType> = [];

                filteredStatisticalData.forEach(item => {
                    const existingItemIndex = sortedStatisticalData.findIndex((x) => x.category === item.category);
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
                    setItems({ [chosenDate]: sortedStatisticalData });
                    setDays([chosenDate]);
                    dispatch(setIsEditingData(false));
                    setIsDatePikerModal(false);
                }
            } else {
                getAlert({ type: "error", text: "No data for this day" }, setIsAlertActive, 3000);
            }
        }
    }

    return (
        <section>
            <Container>
                <Wrapper>
                    <SubBar />
                    <Header openDatePikerModal={setIsDatePikerModal} />
                    <List
                        setIsAlertActive={setIsAlertActive}
                        setItems={setItems}
                        items={items}
                        setDays={setDays}
                        days={days} />
                    {isDatePikerModal ?
                        <>
                            <DatePikerModal getFilterStatistics={getFilterStatistics} />
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