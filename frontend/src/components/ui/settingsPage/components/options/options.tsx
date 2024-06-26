import { FC, ReactElement } from "react";
import { Tabs } from "./components/tabs/tabs";
import { PersonalInformation } from "./components/personalInformation/personalInformation";
import { Privacy } from "./components/privacy/privacy";
import { Container, Wrapper } from "./styledOptions";
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
            content: <Privacy /> },
        { label: 'Tab 3', content: <div>Содержимое таба 3</div> },
    ];

    return (
        <Container>
            <Wrapper>
                <Tabs tabs={tabs} />
            </Wrapper>
        </Container>
    )
}