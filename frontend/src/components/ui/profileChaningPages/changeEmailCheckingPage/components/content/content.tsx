import { FC, useEffect, useState } from "react";
import { AlertComponentProps } from "../../../../../shared/alert/alert";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/store/store";
import { getDataFromLocalStorage } from "../../../../../../storage/localStorage/localStorage";
import { checkGoogleAccount } from "../../../../../../redux/reducers/userReducer/userReducer";
import { ChangeUserAccount, ConfirmAccountModal, Spinner } from ".";
import { LoaderInner } from "./styledContent";

interface ContentProps {
    setAlertActive: (value: null | AlertComponentProps) => void;
}

export const Content: FC<ContentProps> = ({ setAlertActive }) => {
    const [isGoogleAccount, setIsGoogleAccount] = useState<boolean | null>(null);
    const { loading } = useAppSelector((state => state.user));
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
        <>
            {isGoogleAccount === null || loading ?
                (<LoaderInner>
                    <Spinner size={40} height={3} />
                </LoaderInner>)
                : isGoogleAccount ?
                    <ChangeUserAccount setAlertActive={setAlertActive} /> :
                    <ConfirmAccountModal
                        setAlertActive={setAlertActive}
                        goToLink="/settings/change-email-modification" />}
        </>
    );
}