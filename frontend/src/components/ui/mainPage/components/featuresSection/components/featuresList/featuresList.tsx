import { FC, RefObject } from "react";
import { FEATURES_SECTION__PHONE } from "../../../../../../../consts/images";
import { List } from "./components/list/list";
import { Container, ImageInner } from "./styledFeaturesList";

interface FeaturesListProps {
    sectionRef: RefObject<HTMLDivElement>;
}

export const FeaturesList: FC<FeaturesListProps> = ({ sectionRef }) => {
    return (
        <Container>
            <div>
                <ImageInner>
                    <img src={FEATURES_SECTION__PHONE.default} alt="phone" />
                </ImageInner>
                <List sectionRef={sectionRef} />
            </div>
        </Container>
    )
}