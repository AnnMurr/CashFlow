import { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../../../../../redux/store/store";
import { UserDataType } from "../../../../../../api/authApi/authApiTypes";
import { Description, Email, EmailAdressInner, SubTitle, Title } from "./styledContent";

export const Content: FC = () => {
    const [email, setEmail] = useState<string | null>(null);
    const userDataFromRedux: UserDataType | null = useAppSelector((state) => state.user.userData);

    useEffect(() => {
        userDataFromRedux && setEmail(userDataFromRedux?.email);
    }, [userDataFromRedux]);

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