import { Box, CircularProgress } from "@mui/material";
import { FC } from "react";

export const Loading: FC = () => {
    return (
        <Box sx={{ display: 'flex', width: "fit-content", margin: "0 auto" }}>
            <CircularProgress color="success" />
        </Box>
    )
}