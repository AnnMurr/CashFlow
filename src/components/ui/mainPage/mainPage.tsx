import { FC } from "react";
import { Application, FeaturesSection, Footer, Header, HelpCenterPage, HeroSection, RangSection } from ".";


export const MainPage: FC = () => {
    return (
        <>
            <Header />
            <HeroSection />
            <RangSection />
            <FeaturesSection />
            <HelpCenterPage />
            <Application />
            <Footer />
        </>
    )
}