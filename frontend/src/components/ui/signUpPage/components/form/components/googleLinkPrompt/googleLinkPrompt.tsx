import { FC } from "react";
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { linkAccountToGoogle } from "../../../../../../../redux/reducers/userReducer/userReducer";
import { useAppDispatch } from "../../../../../../../redux/store/store";
import { StyledButton } from "./styledGoogleLinkPrompt";

interface GoogleLinkPromptProps {
    setIsGoogleLinkPrompt: (value: boolean | string) => void;
    isGoogleLinkPrompt: boolean | string;
    getLogSuccess: (value: string) => void;
}

export const GoogleLinkPrompt: FC<GoogleLinkPromptProps> = ({
    setIsGoogleLinkPrompt, isGoogleLinkPrompt, getLogSuccess }) => {
    const dispatch = useAppDispatch();

    const linkThisAccountWithGoogle = async () => {
        try {
            if (typeof isGoogleLinkPrompt === "string") {
                const response = (await dispatch(linkAccountToGoogle(isGoogleLinkPrompt))).payload;
                typeof response === "string" && getLogSuccess(response);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <React.Fragment>
            <Dialog
                style={{ position: "fixed", top: "0" }}
                open={Boolean(isGoogleLinkPrompt)}
                onClose={() => setIsGoogleLinkPrompt(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description" >
                <DialogTitle id="alert-dialog-title">
                    {"Email Already in Use"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        It looks like this email is already in use.
                        Would you like to link this account with Google
                        for easier login in the future?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <StyledButton onClick={() => setIsGoogleLinkPrompt(false)}  >
                        Disagree
                    </StyledButton>
                    <StyledButton onClick={linkThisAccountWithGoogle} >
                        Agree
                    </StyledButton>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}