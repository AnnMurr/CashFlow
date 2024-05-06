import { FC } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Description, Email, EmailAdressInner, SubTitle, Title } from "./styledContent";

export const Content: FC = () => {
    const location = useLocation();

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
                            {location.state}
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