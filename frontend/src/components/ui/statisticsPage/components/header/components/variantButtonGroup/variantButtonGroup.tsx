import { FC, useState } from "react";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

interface VariantButtonGroupProps {
    setStatisticType: (value: "expenses" | "income") => void;
    statisticType: "expenses" | "income";
}

export const VariantButtonGroup: FC<VariantButtonGroupProps> = ({ setStatisticType, statisticType }) => {
    const [type, setType] = useState(statisticType);

    const containerStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        '& > *': {
            m: 1,
        },
    };

    const buttonGroupStyles = {
        '& .MuiButtonGroup-firstButton': {
            borderRight: "2px solid #000",
        },
        '&.MuiButtonGroup-root': {
            margin: '0 auto 0 0',
        }
    };

    const buttonStyles = {
        fontFamily: "Almarai",
        padding: "0px 8px",
        fontWeight: "600",

        '&:first-of-type': {
            paddingLeft: "0",
        },
        '&:hover': {
            backgroundColor: "rgb(49 163 71 / 4%)",
        },
    };

    const handleChangeStatisticType = (event: React.MouseEvent<HTMLButtonElement>) => {
        const button = event.target as HTMLButtonElement;
        const value = button.textContent && button.textContent.toLowerCase() as "expenses" | "income";

        if (value) {
            setType(value);
            setStatisticType(value);
        }
    }

    return (
        <Box sx={containerStyles}>
            <ButtonGroup sx={buttonGroupStyles} variant="text" aria-label="Basic button group">
                <Button onClick={handleChangeStatisticType} sx={{
                    ...buttonStyles,
                    color: type === "expenses" ? "#56776C" : "#000",
                }}>Expenses</Button>
                <Button onClick={handleChangeStatisticType} sx={{
                    ...buttonStyles,
                    color: type === "income" ? "#56776C" : "#000",
                }}>Income</Button>
            </ButtonGroup>
        </Box>
    );
}