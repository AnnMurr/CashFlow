import { FC, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { ThemeContextType } from "../../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../../contexts/themeContext/themeContext";
import { Category, Container, UserName } from "./styledHead";

interface HeadProps {
    userName: string | null | undefined;
    setIsModalActive: (value: boolean) => void;
}

export const Head: FC<HeadProps> = ({ userName, setIsModalActive }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <Container>
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
        </Container>
    )
}