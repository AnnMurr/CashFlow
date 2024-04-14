import { FC } from "react";
import { RANG_ITEM_1, RANG_ITEM_2, RANG_ITEM_3, RANG_ITEM_4 } from "../../../../../consts/images";
import { Container, Wrapper } from "./styledRangSection";

export const RangSection: FC = () => {
    return (
        <section>
            <Container>
                <Wrapper>
                    <div>
                        <img src={RANG_ITEM_1} alt="rang" />
                    </div>
                    <div>
                        <img src={RANG_ITEM_2} alt="rang" />
                    </div>
                    <div>
                        <img src={RANG_ITEM_3} alt="rang" />
                    </div>
                    <div>
                        <img src={RANG_ITEM_4} alt="rang" />
                    </div>
                </Wrapper>
            </Container>
        </section>
    )
}