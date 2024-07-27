import { FC, useEffect, useState } from "react";
import { MultipleSelectPlaceholder } from "../../../../../../../../shared/select/select";
import { CURRENCY_SYMBOL_REGEX } from "../../../../../../../../../consts";
import { ButtonComponent } from "../../../../../../../../shared/button/button";
import { useAppDispatch, useAppSelector } from "../../../../../../../../../redux/store/store";
import { RootState, UserStorageDataType } from "../../../../../../../../../redux/reducers/userStorageReduser/types";
import { changeUserData, getDataFromUserStore } from "../../../../../../../../../redux/reducers/userStorageReduser/userStorageReduser";
import { getDataFromLocalStorage } from "../../../../../../../../../storage/localStorage/localStorage";
import { BtnClose } from "../../../../../../../../shared/btnClose/btnClose";
import { Loading } from "../../../../../../../../shared/loading/loading";
import { AlertComponentProps } from "../../../../../../../../shared/alert/alert";
import { getAlert } from "../../../../../../../../../utils/getAlert";
import { getCurrencies } from "../../../../../../../../../utils/getCurrencies";
import { CurrencyNameAndCode } from "../../../../../../../../../api/getCurrencyCodes/types";
import { Wrapper, Container, LoadingInner, BtnInner } from "./styledCurrencyChoosingModal";

interface CurrencyChoosingModalProps {
    setIsCurrencyChoosingModalActive: (value: boolean) => void;
    setIsAlertActive: (value: AlertComponentProps | null) => void;
}

export const CurrencyChoosingModal: FC<CurrencyChoosingModalProps> = ({ setIsCurrencyChoosingModalActive, setIsAlertActive }) => {
    const [currencyName, setCurrencyName] = useState<string | null>(null);
    const [currencies, setCurrencies] = useState<Array<CurrencyNameAndCode> | null>(null);
    const { currency } = useAppSelector((state: RootState) => state.storage);
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
                            currency: {
                                code: code,
                                name: name,
                                symbol: symbol
                            }
                        }
                    };

                    const userDataAfterUpdate = (await dispatch(changeUserData({ userToken: token, updatedData: updatedData }))).payload;

                    if (userDataAfterUpdate) {
                        getAlert({ type: "success", text: "Currency changed successfully" }, setIsAlertActive, 3000);
                        setIsCurrencyChoosingModalActive(false);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    useEffect(() => { 
        getCurrencies(setCurrencies, setIsAlertActive);
        currency && setCurrencyName(`${currency?.name} (${currency.symbol})`);
     }, []);

    return (
        currencies && currencyName ?
            <Container >
                <Wrapper>
                    <BtnClose
                        btnInnerstyles={{
                            marginLeft: "auto",
                            paddingBottom: "5px",
                        }}
                        closeBlock={setIsCurrencyChoosingModalActive}
                        size="lg"
                        color="#000" />
                    <MultipleSelectPlaceholder
                        setCategoryName={setCurrencyName}
                        categoryName={currencyName}
                        names={currencies} />
                    <BtnInner>
                        <ButtonComponent
                            backgroundColor="#5B8A72"
                            BackgroundColorHover="#0f4a34"
                            text="Change currency"
                            color="#fff"
                            type="button"
                            func={handleChangeCurrency} />
                    </BtnInner>
                </Wrapper>
            </Container> :
            <LoadingInner >
                <Loading size={40} height={3} color="#fff" />
            </LoadingInner>
    )
}

