import { FC, useContext } from "react";
import { Item } from "./component/item/item";
import { faClock, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { ThemeContextType } from "../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../contexts/themeContext/themeContext";
import { List } from "./styledPrivacy";

export const Privacy: FC = () => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    
    return (
        <List themestyles={themeContext.themeStyles}>
            <Item
                link={"/settings/change-name"}
                icon={faClock}
                title="Create a plan in case you stop using your account"
                subTitle="Schedule actions for your data" />
            <Item
                link={"/settings/deleting-account-confirmation"}
                icon={faTrashCan}
                title="Account deleting"
                subTitle="Completely delete your account and all data" />
        </List>
    )
}