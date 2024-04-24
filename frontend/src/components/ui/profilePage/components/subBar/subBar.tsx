import { FC, useState } from "react";
import { WALLET_ICON, EXPENSES_ICON, SETTING_ICON } from "../../../../../consts/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Item } from "./components/item/item";
import { Container, List, Wrapper, BurgerInner } from "./styledSubBar";

export const SubBar: FC = () => {
    const [isAtiveBar, setIsAtiveBar] = useState<boolean>(false);

    const changeAtiveBar = () => setIsAtiveBar((prev) => !prev);

    return (
        <Container>
            <Wrapper>
                <BurgerInner>
                    <button type="button" onClick={changeAtiveBar}>
                        <FontAwesomeIcon
                            style={{ transform: `rotate(${isAtiveBar ? "0" : "90deg"})` }}
                            icon={faBars} size="xl"
                            color="#fff" />
                    </button>
                </BurgerInner>
                <List>
                    <Item
                        image={WALLET_ICON.default}
                        altText="wallet"
                        isAtiveBar={isAtiveBar}
                        text="Income"
                        linkTo="/" />
                    <Item
                        image={EXPENSES_ICON.default}
                        altText="budgeting"
                        isAtiveBar={isAtiveBar}
                        text="Expenses"
                        linkTo="/" />
                    <Item
                        image={SETTING_ICON.default}
                        altText="gear"
                        isAtiveBar={isAtiveBar}
                        text="Settings"
                        linkTo="/" />
                </List>
            </Wrapper>
        </Container>
    )
}