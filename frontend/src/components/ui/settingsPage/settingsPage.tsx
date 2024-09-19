import { FC } from "react";
import { Options } from "./components/options/options";
import { useAppSelector } from "../../../redux/store/store";
import { Body, Spinner, SubBar } from ".";
import { Container, LoaderInner } from "./styledSettingsPage";

export const SettingsPage: FC = () => {
    const { loading } = useAppSelector((state) => state.user);

    return (
        <Body>
            <section>
                <Container>
                    <div>
                        <SubBar />
                        {!loading ?
                            <Options /> :
                            <LoaderInner>
                                <Spinner size={80} height={3} />
                            </LoaderInner>}
                    </div>
                </Container>
            </section>
        </Body>
    )
}