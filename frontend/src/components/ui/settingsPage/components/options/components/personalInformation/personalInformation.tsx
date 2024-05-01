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
                    <Item category={"Name"} value={userData.name} />
                    <Item category={"Email"} value={userData.email} />
                </>
                : null}
        </List>
    )
}