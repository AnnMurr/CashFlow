import { FC, ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faCoins, faPalette, faShield } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Appearance, ChartSettings, CurrencySettings, PersonalInformation, Privacy, Tabs } from ".";
import { Container, Wrapper } from "./styledOptions";

export interface TabsType {
    label: string | ReactElement;
    content: ReactElement;
}

export const Options: FC = () => {
    const tabs: Array<TabsType> = [
        {
            label: (
                <span>
                    <FontAwesomeIcon size="xs" icon={faUser} />   Personal information
                </span>
            ),
            content: <PersonalInformation />
        },
        {
            label: (
                <span>
                    <FontAwesomeIcon size="xs" icon={faShield} />   Data and Privacy
                </span>
            ),
            content: <Privacy />
        },
        {
            label: (
                <span>
                    <FontAwesomeIcon size="xs" icon={faCoins} />   Currency settings
                </span>
            ),
            content: <CurrencySettings />
        },
        {
            label: (
                <span>
                    <FontAwesomeIcon size="xs" icon={faPalette} />   Appearance
                </span>
            ),
            content: <Appearance />
        },
        {
            label: (
                <span>
                    <FontAwesomeIcon size="xs" icon={faChartLine} />   Chart settings
                </span>
            ),
            content: <ChartSettings />
        },
    ];

    return (
        <Container>
            <Wrapper>
                <Tabs tabs={tabs} />
            </Wrapper>
        </Container>
    )
}