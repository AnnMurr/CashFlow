import { FC, useEffect, useState } from "react";
import { AlertComponent, AlertComponentProps } from "../../../../../shared/alert/alert";
import { AccountConfirmationBlock } from "./components/accountConfirmationBlock/accountConfirmationBlock";
import { useAppDispatch } from "../../../../../../redux/store/store";
import { getDataFromLocalStorage } from "../../../../../../storage/localStorage/localStorage";
import { checkGoogleAccount } from "../../../../../../redux/reducers/userReducer/userReducer";
import { DeletingGoogleAccount } from "./components/deletingGoogleAccount/deletingGoogleAccount";
import { Loading } from "../../../../../shared/loading/loading";
import { Wrapper } from "./styledContent";

export const Content: FC = () => {
    const [isAlertActive, setAlertActive] = useState<null | AlertComponentProps>(null);
    const [isGoogleAccount, setIsGoogleAccount] = useState<boolean | null>(null);
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
        <Wrapper>
            {isGoogleAccount === null ?
                <Loading size={40} height={3} /> :
                isGoogleAccount ?
                    <DeletingGoogleAccount /> :
                    <AccountConfirmationBlock setAlertActive={setAlertActive} />}

            {isAlertActive ?
                <AlertComponent type={isAlertActive.type} text={isAlertActive.text} />
                : null}
        </Wrapper>
    )
}