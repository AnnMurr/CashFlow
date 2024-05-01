import { FC, useEffect } from "react";
import { Application, FeaturesSection, Footer, Header, HelpCenterPage, HeroSection, RangSection } from ".";
import { upd } from "../../../api/authApi/authApi";


export const MainPage: FC = () => {
    useEffect(() => {
        upd()
    })
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