import { FC } from "react";
import { Item } from "./components/item/item";
import { List, Container  } from "./styledNav";

export const Nav: FC = () => {
    return (
        <Container>
            <List>
                <Item text={"Contact Us"} />
                <Item text={"Contact Us"} />
                <Item text={"Contact Us"} />
                <Item text={"Contact Us"} />
            </List>
        </Container>
    )
}