import { FC } from "react";
import { FEATURES_SECTION__PHONE } from "../../../../../../../consts/images";
import { List } from "./components/list/list";
import { Container, ImageInner } from "./styledFeaturesList";

export const FeaturesList: FC = () => {
    return (
        <Container>
            <div>
                <ImageInner>
                    <img src={FEATURES_SECTION__PHONE} alt="phone" />
                </ImageInner>
                <List />
            </div>
        </Container>
    )
}