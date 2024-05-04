import { useEffect, useState } from "react";
import { getUserDataById } from "../../../../../../../api/authApi/authApi";
import { UserDataType } from "../../../../../../../api/authApi/authApiTypes";
import { getDataFromLocalStorage } from "../../../../../../../storage/localStorage/localStorage";
import { Item } from "./component/item/item";
import { List } from "./styledPersonalInformation";

export const PersonalInformation = () => {
    const [userData, setUserData] = useState<null | UserDataType>(null);

    const getUserData = async () => {
        try {
            const token = getDataFromLocalStorage("token");
            const response = await getUserDataById(token);
            setUserData(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <List>
            {userData ?
                <>
                    <Item link={"/settings/change-name"} category={"Name"} value={userData.name} />
                    <Item link={"/settings/change-email"} category={"Email"} value={userData.email} />
                    <Item link={"/settings/change-password"} category={"Password"} value={userData.password} />
                </>
                : null}
        </List>
    )
}