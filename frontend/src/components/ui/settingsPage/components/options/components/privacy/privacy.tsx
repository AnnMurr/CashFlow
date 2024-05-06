import { FC } from "react";
import { Item } from "./component/item/item";
import { faClock, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { List } from "./styledPrivacy";

export const Privacy: FC = () => {
    return (
        <List>
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