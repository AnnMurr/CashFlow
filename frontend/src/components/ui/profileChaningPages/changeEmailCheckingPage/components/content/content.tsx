import { FC, useEffect, useState } from "react";
import { AlertComponentProps } from "../../../../../shared/alert/alert";
import { useAppDispatch } from "../../../../../../redux/store/store";
import { getDataFromLocalStorage } from "../../../../../../storage/localStorage/localStorage";
import { checkGoogleAccount } from "../../../../../../redux/reducers/userReducer/userReducer";
import { ChangeUserAccount } from "../../../../../shared/googleAuth/changeUserAccount/changeUserAccount";
import { Spinner } from "../../../../../shared/spinner/spinner";
import { ConfirmAccountModal } from "../../../../../shared/сonfirmAccountModal/confirmAccountModal";

interface ContentProps {
    setAlertActive: (value: null | AlertComponentProps) => void;
}

export const Content: FC<ContentProps> = ({ setAlertActive }) => {
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
        <>
            {isGoogleAccount === null ?
                <Spinner size={40} height={3} /> : isGoogleAccount ?
                    <ChangeUserAccount setAlertActive={setAlertActive} /> :
                    <ConfirmAccountModal
                        setAlertActive={setAlertActive}
                        goToLink="/settings/change-email-modification" />}
        </>
    );
}