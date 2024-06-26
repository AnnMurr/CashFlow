import { FC } from "react";
import { Item } from "./components/item/item";
import { List, Container } from "./styledNav";

export const Nav: FC = () => {
    return (
        <Container>
            <List>
                <Item text={"Privacy Policy"} link="/privacy-policy" />
                <Item text={"About"} link="/about" />
                <Item text={"Contacts"} link="/contacts" />
                <Item text={"Contact Us"} link="/contacts-us" />
            </List>
        </Container>
    )
}