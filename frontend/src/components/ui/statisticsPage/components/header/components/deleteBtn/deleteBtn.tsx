import { FC } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DeleteBtnProps {
    setIsDeleteFinancesModal: (value: boolean) => void;
}

export const DeleteBtn: FC<DeleteBtnProps> = ({ setIsDeleteFinancesModal }) => {
    return (
        <div>
            <button onClick={() => setIsDeleteFinancesModal(true)}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    )
}