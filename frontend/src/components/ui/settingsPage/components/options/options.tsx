import { FC, ReactElement } from "react";
import { Tabs } from "./components/tabs/tabs";
import { PersonalInformation } from "./components/personalInformation/personalInformation";
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
        { label: 'Tab 2', content: <div>Содержимое таба 2</div> },
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