import { FC, useContext } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContextType } from "../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../contexts/themeContext/themeContext";
import { Container } from "./styledDeleteBtn";

interface DeleteBtnProps {
    setIsDeleteFinancesModal: (value: boolean) => void;
}

export const DeleteBtn: FC<DeleteBtnProps> = ({ setIsDeleteFinancesModal }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    
    return (
        <Container>
            <button onClick={() => setIsDeleteFinancesModal(true)}>
                <FontAwesomeIcon color={themeContext.themeStyles.color} icon={faTrash} />
            </button>
        </Container>
    )
}