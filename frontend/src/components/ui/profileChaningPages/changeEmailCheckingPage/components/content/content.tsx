import { FC, useEffect, useState } from "react";
import { AlertComponent, AlertComponentProps } from "../../../../../shared/alert/alert";
import { useAppDispatch } from "../../../../../../redux/store/store";
import { getDataFromLocalStorage } from "../../../../../../storage/localStorage/localStorage";
import { checkGoogleAccount } from "../../../../../../redux/reducers/userReducer/userReducer";
import { AccountConfirmationBlock } from "./components/accountConfirmationBlock/accountConfirmationBlock";
import { ChangeUserAccount } from "../../../../../shared/googleAuth/changeUserAccount/changeUserAccount";

export const Content: FC = () => {
    const [isAlertActive, setAlertActive] = useState<null | AlertComponentProps>(null);
    const [isGoogleAccount, setIsGoogleAccount] = useState<boolean>(true);
    const despatch = useAppDispatch();

    useEffect(() => {
        const getUserTypeOfAccount = async () => {
            const token = getDataFromLocalStorage("token");
            const response = await despatch(checkGoogleAccount(token));

            response ?
                setIsGoogleAccount(true) :
                setIsGoogleAccount(false);
        }

        getUserTypeOfAccount();
    }, []);

    return (
        <>
            {isGoogleAccount ?
                <ChangeUserAccount setAlertActive={setAlertActive} /> :
                <AccountConfirmationBlock setAlertActive={setAlertActive} />}
            {isAlertActive && (
                <AlertComponent type={isAlertActive.type} text={isAlertActive.text} />
            )}
        </>
    );
}