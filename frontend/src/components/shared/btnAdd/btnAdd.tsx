import { FC, useContext } from "react";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { ThemeContextType } from "../../../contexts/themeContext/types";
import { ThemeContext } from "../../../contexts/themeContext/themeContext";

interface BtnAddProps {
    size?: string;
    func: () => void;
}

export const BtnAdd: FC<BtnAddProps> = ({ size, func }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <Box>
            <Fab
                aria-label="add"
                onClick={func}
                sx={{
                    backgroundColor: themeContext.themeStyles.buttonBackground,
                    color: "#fff",
                    width: size ? size : "50px",
                    height: size ? size : "50px",

                    '&:hover': {
                        backgroundColor: themeContext.themeStyles.buttonBackgroundHover
                    }
                }} >
                <AddIcon />
            </Fab>
        </Box>
    )

}