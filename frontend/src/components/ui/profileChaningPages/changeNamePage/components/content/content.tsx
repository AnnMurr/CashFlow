import { FC, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { EditUserDataModal } from "./components/editUserDataModal/editUserDataModal";
import { DarkBackground } from "../../../../../shared/darkBackground/darkBackground";
import { AlertComponent, AlertComponentProps } from "../../../../../shared/alert/alert";
import { useAppSelector } from "../../../../../../redux/store/store";
import { UserDataType } from "../../../../../../redux/reducers/userReducer/types";
import { ThemeContextType } from "../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../contexts/themeContext/themeContext";
import { Wrapper, UserName, Category } from "./styledContent";

export const Content: FC = () => {
    const [isModalActive, setIsModalActive] = useState<boolean>(false);
    const [isAlertActive, setIsAlertActive] = useState<null | AlertComponentProps>(null);
    const [userName, setUserName] = useState<string | null | undefined>(null);
    const userDataFromRedux: UserDataType | null = useAppSelector((state) => state.user.userData);
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    useEffect(() => {
        userDataFromRedux && setUserName(userDataFromRedux?.name)
    }, [userDataFromRedux]);

    return (
        <Wrapper themestyles={themeContext.themeStyles}>
            <div>
                <Category themestyles={themeContext.themeStyles}>
                    <h3>
                        Name
                    </h3>
                </Category>
                <UserName themestyles={themeContext.themeStyles}>
                    <span>{userName}</span>
                </UserName>
            </div>
            <div>
                <button onClick={() => setIsModalActive(true)} type="button">
                    <FontAwesomeIcon color={themeContext.themeStyles.color} icon={faPen} />
                </button>
            </div>
            {isModalActive ?
                <>
                    <EditUserDataModal
                        userData={userName}
                        changeUserData={setUserName}
                        setIsModalActive={setIsModalActive}
                        setIsAlertActive={setIsAlertActive} />
                    <DarkBackground
                        setIsModalActive={setIsModalActive}
                        isModalActive={isModalActive} />
                </> : null}
            {isAlertActive ?
                <AlertComponent type={isAlertActive.type} text={isAlertActive.text} />
                : null}
        </Wrapper>
    )
}