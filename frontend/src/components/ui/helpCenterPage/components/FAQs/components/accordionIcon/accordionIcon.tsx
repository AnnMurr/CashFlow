import { FC } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from "react";

interface AccordionIconProps {
    title: string;
    text: string;
    panelNumber: number;
    expanded: string | false;
    onChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

export const AccordionIcon: FC<AccordionIconProps> = ({ title, text, panelNumber, expanded, onChange }) => {
    const panel = `panel${panelNumber}`;

    return (
        <Accordion expanded={expanded === panel} onChange={onChange(panel)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${panelNumber}bh-content`}
                id={`panel${panelNumber}bh-header`} >
                <Typography sx={{
                    fontWeight: "600",
                    flexShrink: 0,
                    overflowWrap: "break-word",
                    wordWrap: "break-word",
                    width: "100%",
                }}>
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {text}
                </Typography>
            </AccordionDetails>
        </Accordion>
    )
}