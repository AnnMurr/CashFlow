import { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { getDataFromLocalStorage } from "../../../../../../storage/localStorage/localStorage";
import { getUserDataById } from "../../../../../../api/authApi/authApi";
import { Description, Email, EmailAdressInner, SubTitle, Title } from "./styledContent";

export const Content: FC = () => {
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        const getName = async () => {
            try {
                const token = getDataFromLocalStorage("token");
                const userData = await getUserDataById(token);
                userData.email && setEmail(userData.email);
            } catch (error) {
                console.log(error);
            }
        }

        getName();
    }, []);

    return (
        <div>
            <div>
                <Description>
                    <Title>
                        <h3>
                            Contact email
                        </h3>
                    </Title>
                    <SubTitle>
                        <h5>
                            The address to which information about the services used in this account is sent.
                        </h5>
                    </SubTitle>
                </Description>
                <EmailAdressInner to={"/settings/change-email-checking"}>
                    <Email>
                        <span>
                            {email}
                        </span>
                    </Email>
                    <div>
                        <FontAwesomeIcon size="lg" icon={faAngleRight} />
                    </div>
                </EmailAdressInner>
            </div>
        </div>
    )
}