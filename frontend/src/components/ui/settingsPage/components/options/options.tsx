import { FC } from "react";
import { Container, Wrapper } from "./styledOptions";
import { Tabs } from "./components/tabs/tabs";
import { PersonalInformation } from "./components/personalInformation/personalInformation";

export const Options: FC = () => {
    const tabs = [
        {
            label: 'Personal information', content: 
            <PersonalInformation />
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