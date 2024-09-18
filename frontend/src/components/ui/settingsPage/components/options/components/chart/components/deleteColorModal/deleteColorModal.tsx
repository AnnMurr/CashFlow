import { FC, useContext } from "react";
import { ThemeContext } from "../../../../../../../../../contexts/themeContext/themeContext";
import { ThemeContextType } from "../../../../../../../../../contexts/themeContext/types";
import { ConfirmationModal } from "../../../../../../../../shared/confirmationModal/confirmationModal";
import { Container } from "./styledDeleteColorModal";

interface DeleteColorModalProps {
    closeModal: (value: boolean) => void;
    handleDeleteColor: () => void;
}

export const DeleteColorModal: FC<DeleteColorModalProps> = ({ closeModal, handleDeleteColor }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <Container themestyles={themeContext.themeStyles}>
            <ConfirmationModal
                closeModal={closeModal}
                handleClick={handleDeleteColor}
                text="Are you sure you want to delete this color?"
                btnText={"Delete"} />
        </Container>
    )
}