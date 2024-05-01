import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Category, Line, List, Value, } from "./styledPersonalInformation"
import { useEffect } from "react"

export const PersonalInformation = () => {
    useEffect(() => {
        try {
            
        } catch (error) {
            console.error(error)
        }
    }, []);

    return (
        <List>
            <Line>
                <div>
                    <Category>
                        name
                    </Category>
                </div>
                <div>
                    <Value>
                        Hanna
                    </Value>
                </div>
                <div>
                    <FontAwesomeIcon icon={faArrowRight} />
                </div>

            </Line>
            <Line>
                <div>
                    <Category>
                        name
                    </Category>
                </div>
                <div>
                    <Value>
                        Hanna
                    </Value>
                </div>
                <div>
                    <FontAwesomeIcon icon={faArrowRight} />
                </div>

            </Line>
            <Line>
                <div>
                    <Category>
                        name
                    </Category>
                </div>
                <div>
                    <Value>
                        Hanna
                    </Value>
                </div>
                <div>
                    <FontAwesomeIcon icon={faArrowRight} />
                </div>

            </Line>
        </List>
    )
}