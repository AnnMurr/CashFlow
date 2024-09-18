import { FC } from "react";
import { AlertComponentProps } from "../../../../../shared/alert/alert";
import { ConfirmAccountModal } from "../../../../../shared/сonfirmAccountModal/confirmAccountModal";

interface AccountConfirmationBlockProps {
    setAlertActive: (value: null | AlertComponentProps) => void;
}

export const Content: FC<AccountConfirmationBlockProps> = ({ setAlertActive }) => {
    return (
        <ConfirmAccountModal
            setAlertActive={setAlertActive}
            goToLink="/settings/change-password-modification" />
    )
}