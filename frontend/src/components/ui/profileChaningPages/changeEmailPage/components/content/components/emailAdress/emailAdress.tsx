import { FC, useContext } from "react";
import { Container, Email, EmailAdressLink } from "./styledEmailAdress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { ThemeContextType } from "../../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../../contexts/themeContext/themeContext";

interface EmailAdressProps {
    email: string | null;
}

export const EmailAdress: FC<EmailAdressProps> = ({ email }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <Container themestyles={themeContext.themeStyles} >
            <EmailAdressLink
                themestyles={themeContext.themeStyles}
                to={"/settings/change-email-checking"}>
                <Email themestyles={themeContext.themeStyles}>
                    <span>
                        {email}
                    </span>
                </Email>
                <div>
                    <FontAwesomeIcon
                        color={themeContext.themeStyles.color}
                        size="lg"
                        icon={faAngleRight} />
                </div>
            </EmailAdressLink>
        </Container>
    )
}