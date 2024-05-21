import { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClockRotateLeft, faGear, faSackDollar, faWallet } from "@fortawesome/free-solid-svg-icons";
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
                        icon={faWallet}
                        isAtiveBar={isAtiveBar}
                        text="Income"
                        linkTo="/income" />
                    <Item
                        icon={faSackDollar}
                        isAtiveBar={isAtiveBar}
                        text="Expenses"
                        linkTo="/expenses" />
                    <Item
                        icon={faGear}
                        isAtiveBar={isAtiveBar}
                        text="Settings"
                        linkTo="/settings" />
                    <Item
                        icon={faClockRotateLeft}
                        isAtiveBar={isAtiveBar}
                        text="Statistics"
                        linkTo="/statistics" />
                </List>
            </Wrapper>
        </Container>
    )
}