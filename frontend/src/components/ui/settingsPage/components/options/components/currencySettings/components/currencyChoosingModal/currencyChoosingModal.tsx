import { FC, useContext, useEffect, useState } from "react";
import { MultipleSelectPlaceholder } from "../../../../../../../../shared/select/select";
import { CURRENCY_SYMBOL_REGEX } from "../../../../../../../../../consts";
import { ButtonComponent } from "../../../../../../../../shared/button/button";
import { useAppDispatch, useAppSelector } from "../../../../../../../../../redux/store/store";
import { RootState, UserStorageDataType } from "../../../../../../../../../redux/reducers/userStorageReduser/types";
import { changeUserData, getDataFromUserStore } from "../../../../../../../../../redux/reducers/userStorageReduser/userStorageReduser";
import { getDataFromLocalStorage } from "../../../../../../../../../storage/localStorage/localStorage";
import { BtnClose } from "../../../../../../../../shared/btnClose/btnClose";
import { Spinner } from "../../../../../../../../shared/spinner/spinner";
import { AlertComponentProps } from "../../../../../../../../shared/alert/alert";
import { showAlert } from "../../../../../../../../../utils/showAlert";
import { fetchAndSetCurrencies } from "../../../../../../../../../utils/setCurrencies";
import { CurrencyNameAndCode } from "../../../../../../../../../api/getCurrencyCodes/types";
import { ThemeContextType } from "../../../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../../../contexts/themeContext/themeContext";
import { Wrapper, Container, LoadingInner, BtnInner } from "./styledCurrencyChoosingModal";

interface CurrencyChoosingModalProps {
    setIsCurrencyChoosingModalActive: (value: boolean) => void;
    setIsAlertActive: (value: AlertComponentProps | null) => void;
}

export const CurrencyChoosingModal: FC<CurrencyChoosingModalProps> = ({ setIsCurrencyChoosingModalActive, setIsAlertActive }) => {
    const [currencyName, setCurrencyName] = useState<string | null>(null);
    const [currencies, setCurrencies] = useState<Array<CurrencyNameAndCode> | null>(null);
    const { currency } = useAppSelector((state: RootState) => state.storage);
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const dispatch = useAppDispatch();

    const handleChangeCurrency = async () => {
        if (currencies) {
            const code = (currencies.find((name) => name.name === currencyName) as CurrencyNameAndCode).code;
            const name = currencyName?.split('(')[0].trim();
            const symbol = currencyName?.match(CURRENCY_SYMBOL_REGEX)?.[1].trim();

            try {
                if (code && name && symbol) {
                    const token = getDataFromLocalStorage("token");
                    const dataFromUserStore = (await dispatch(getDataFromUserStore(token))).payload as UserStorageDataType;

                    const updatedData = {
                        ...dataFromUserStore,
                        settings: {
                            ...dataFromUserStore.settings,
                            currency: {
                                code: code,
                                name: name,
                                symbol: symbol
                            }
                        }
                    };

                    const userDataAfterUpdate = (await dispatch(changeUserData({ userToken: token, updatedData: updatedData }))).payload;

                    if (userDataAfterUpdate) {
                        showAlert({ type: "success", text: "Currency changed successfully" }, setIsAlertActive, 3000);
                        setIsCurrencyChoosingModalActive(false);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    useEffect(() => {
        fetchAndSetCurrencies(setCurrencies, setIsAlertActive);
        currency && setCurrencyName(`${currency?.name} (${currency.symbol})`);
    }, []);

    return (
        currencies && currencyName ?
            <Container themestyles={themeContext.themeStyles}>
                <Wrapper>
                    <BtnClose
                        btnInnerstyles={{
                            marginLeft: "auto",
                            paddingBottom: "15px",
                        }}
                        closeBlock={setIsCurrencyChoosingModalActive}
                        size="lg" />
                    <MultipleSelectPlaceholder
                        isDisabled={false}
                        setCategoryName={setCurrencyName}
                        categoryName={currencyName}
                        names={currencies} />
                    <BtnInner>
                        <ButtonComponent
                            text="Change currency"
                            color="#fff"
                            type="button"
                            func={handleChangeCurrency} />
                    </BtnInner>
                </Wrapper>
            </Container> :
            <LoadingInner >
                <Spinner size={40} height={3} />
            </LoadingInner>
    )
}

