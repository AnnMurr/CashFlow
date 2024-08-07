import { FC, useContext, useEffect, useState } from "react";
import { useAppSelector } from "../../../../../../../redux/store/store";
import { Item } from "./components/item/item";
import { RootState, UserStorageDataType } from "../../../../../../../redux/reducers/userStorageReduser/types";
import { CurrencyChoosingModal } from "./components/currencyChoosingModal/currencyChoosingModal";
import { DarkBackground } from "../../../../../../shared/darkBackground/darkBackground";
import { AlertComponent, AlertComponentProps } from "../../../../../../shared/alert/alert";
import { ThemeContextType } from "../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../contexts/themeContext/themeContext";
import { Container, List } from "./styledCurrencySettings";

export const CurrencySettings: FC = () => {
    const [userStorageData, setUserStorageData] = useState<UserStorageDataType | null>(null);
    const [isCurrencyChoosingModalActive, setIsCurrencyChoosingModalActive] = useState<boolean>(false);
    const [isAlertActive, setIsAlertActive] = useState<AlertComponentProps | null>(null);
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const { storageData } = useAppSelector((state: RootState) => state.storage);

    useEffect(() => {
        storageData && setUserStorageData(storageData);
    }, [storageData]);

    return (
        <Container>
            <List themestyles={themeContext.themeStyles}>
                {userStorageData ?
                    <>
                        <Item
                            setIsCurrencyChoosingModalActive={setIsCurrencyChoosingModalActive}
                            category={"Currency"}
                            data={userStorageData} />
                    </>
                    : null}
            </List>
            {isCurrencyChoosingModalActive ?
                <>
                    <CurrencyChoosingModal
                        setIsCurrencyChoosingModalActive={setIsCurrencyChoosingModalActive}
                        setIsAlertActive={setIsAlertActive} />
                    <DarkBackground
                        setIsModalActive={setIsCurrencyChoosingModalActive}
                        isModalActive={isCurrencyChoosingModalActive} />
                </>
                : null}
            {isAlertActive ?
                <AlertComponent type={isAlertActive.type} text={isAlertActive.text} />
                : null}
        </Container>
    )
}