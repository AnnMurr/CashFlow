import { FC } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const DeleteBtn: FC = () => {
    
    return (
        <div>
            <button>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    )
}