import { FC, useContext } from "react";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { ThemeContextType } from "../../../contexts/themeContext/types";
import { ThemeContext } from "../../../contexts/themeContext/themeContext";

interface BtnAddProps {
    size?: string;
    func: () => void;
    isDisabled: boolean;
}

export const BtnAdd: FC<BtnAddProps> = ({ size, func, isDisabled }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <Box>
            <Fab
                disabled={isDisabled}
                aria-label="add"
                onClick={func}
                sx={{
                    backgroundColor: themeContext.themeStyles.buttonBackground,
                    color: "#fff",
                    width: size ? size : "50px",
                    height: size ? size : "50px",

                    '&.Mui-disabled': {
                        backgroundColor: themeContext.themeStyles.btnAddDisabledBackground,
                        color: "rgb(0 0 0 / 46%)"
                    },

                    '&:hover': {
                        backgroundColor: themeContext.themeStyles.buttonBackgroundHover
                    }
                }} >
                <AddIcon />
            </Fab>
        </Box>
    )

}