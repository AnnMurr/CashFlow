import { FC, useContext, useState } from "react";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { ThemeContextType } from "../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../contexts/themeContext/themeContext";

interface VariantButtonGroupProps {
    setStatisticType: (value: "expenses" | "income") => void;
    statisticType: "expenses" | "income";
}

export const VariantButtonGroup: FC<VariantButtonGroupProps> = ({ setStatisticType, statisticType }) => {
    const [type, setType] = useState(statisticType);
    const themeContext = useContext<ThemeContextType>(ThemeContext);

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
            borderRight: `2px solid ${themeContext.themeStyles.buttonGroupColor}`,
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
            backgroundColor: themeContext.themeStyles.buttonGroupHover,
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
                    color: type === "expenses" ? themeContext.themeStyles.buttonActiveGroupColor : themeContext.themeStyles.buttonGroupColor,
                }}>Expenses</Button>
                <Button onClick={handleChangeStatisticType} sx={{
                    ...buttonStyles,
                    color: type === "income" ? themeContext.themeStyles.buttonActiveGroupColor : themeContext.themeStyles.buttonGroupColor,
                }}>Income</Button>
            </ButtonGroup>
        </Box>
    );
}