import { Alert } from "@mui/material";
import { FC, useState } from "react";
import { useSwipeable } from 'react-swipeable';
import { Container } from "./styledAlertComponent";

export interface AlertComponentProps {
    type: 'error' | 'warning' | 'info' | 'success';
    text: string;
}

export const AlertComponent: FC<AlertComponentProps> = ({ type, text }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handlers = useSwipeable({
        onSwipedLeft: () => handleSwipe(),
        onSwipedRight: () => handleSwipe(),
        onSwipedUp: () => handleSwipe(),
        trackMouse: true,
    });

    const handleSwipe = () => {
        setIsVisible(false);
    };

    const alertStyles = {
        "@media screen and (max-width: 420px)": {
            minHeight: "54px",
            alignItems: "center"
        }
    }

    if (!isVisible) return null;

    return (
        <Container
            {...handlers}
            style={{
                transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
                opacity: isVisible ? 1 : 0,
            }}
        >
            <Alert sx={alertStyles} severity={type}>{text}</Alert>
        </Container>
    )
}