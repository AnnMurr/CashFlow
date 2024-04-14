import { FC } from "react";
import { Application, FeaturesSection, Footer, Header, HeroSection, RangSection } from ".";

export const MainPage: FC = () => {
    return (
        <>
            <Header />
            <HeroSection />
            <RangSection />
            <FeaturesSection />
            <Application />
            <Footer />
        </>
    )
}