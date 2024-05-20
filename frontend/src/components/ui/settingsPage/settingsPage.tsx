import { FC } from "react";
import { SubBar } from "../../shared/subBar/subBar";
import { Options } from "./components/options/options";
import { useAppSelector } from "../../../redux/store/store";
import { Loading } from "../../shared/loading/loading";
import { Container, LoaderInner } from "./styledSettingsPage";

export const SettingsPage: FC = () => {
    const { loading } = useAppSelector((state) => state.user);

    return (
        <section>
            <Container>
                <div>
                    <SubBar />
                    {!loading ? <Options /> : <LoaderInner> <Loading size={80} height={3} /> </LoaderInner>}
                </div>
            </Container>
        </section>
    )
}