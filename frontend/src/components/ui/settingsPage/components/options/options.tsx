import { FC, ReactElement } from "react";
import { Tabs } from "./components/tabs/tabs";
import { PersonalInformation } from "./components/personalInformation/personalInformation";
import { Privacy } from "./components/privacy/privacy";
import { CurrencySettings } from "./components/currencySettings/currencySettings";
import { Container, Wrapper } from "./styledOptions";
import { Appearance } from "./components/appearance/appearance";
import { ChartSettings } from "./components/chart/chart";

export interface TabsType {
    label: string;
    content: ReactElement;
}

export const Options: FC = () => {
    const tabs: Array<TabsType> = [
        {
            label: 'Personal information',
            content: <PersonalInformation />
        },
        {
            label: 'Data and Privacy',
            content: <Privacy />
        },
        {
            label: 'Currency settings',
            content: <CurrencySettings />
        },
        {
            label: 'Appearance',
            content: <Appearance />
        },
        {
            label: 'Chart settings',
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