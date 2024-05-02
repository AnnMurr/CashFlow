import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { Description, EmailAdressInner, SubTitle, Title } from "./styledItem";

export const Item: FC = () => {
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
                <EmailAdressInner>
                    <div>
                        {location.state}
                    </div>
                    <div>
                        <FontAwesomeIcon size="lg" icon={faAngleRight} />
                    </div>
                </EmailAdressInner>
            </div>
        </div>
    )
}