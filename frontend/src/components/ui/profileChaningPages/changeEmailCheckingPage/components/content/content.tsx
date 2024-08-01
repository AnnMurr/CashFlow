import { FC, useContext, useEffect, useState } from "react";
import { AlertComponent, AlertComponentProps } from "../../../../../shared/alert/alert";
import { useAppDispatch } from "../../../../../../redux/store/store";
import { getDataFromLocalStorage } from "../../../../../../storage/localStorage/localStorage";
import { checkGoogleAccount } from "../../../../../../redux/reducers/userReducer/userReducer";
import { AccountConfirmationBlock } from "./components/accountConfirmationBlock/accountConfirmationBlock";
import { ChangeUserAccount } from "../../../../../shared/googleAuth/changeUserAccount/changeUserAccount";
import { Loading } from "../../../../../shared/loading/loading";
import { ThemeContextType } from "../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../contexts/themeContext/themeContext";
import { Wrapper } from "./styledContent";

export const Content: FC = () => {
    const [isAlertActive, setAlertActive] = useState<null | AlertComponentProps>(null);
    const [isGoogleAccount, setIsGoogleAccount] = useState<boolean | null>(null);
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const despatch = useAppDispatch();

    useEffect(() => {
        const getUserTypeOfAccount = async () => {
            const token = getDataFromLocalStorage("token");
            const response = (await despatch(checkGoogleAccount(token))).payload;

            response ?
                setIsGoogleAccount(true) :
                setIsGoogleAccount(false);
        }

        getUserTypeOfAccount();
    }, []);

    return (
        <Wrapper themestyles={themeContext.themeStyles}>
            {isGoogleAccount === null ?
                <Loading size={40} height={3} /> : isGoogleAccount ?
                    <ChangeUserAccount setAlertActive={setAlertActive} /> :
                    <AccountConfirmationBlock setAlertActive={setAlertActive} />}
            {isAlertActive && (
                <AlertComponent type={isAlertActive.type} text={isAlertActive.text} />
            )}
        </Wrapper>
    );
}