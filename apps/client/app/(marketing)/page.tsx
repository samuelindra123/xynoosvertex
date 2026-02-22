import { HeroSection } from "@/components/sections/HeroSection";
import { ClosingSection } from "@/components/sections/ClosingSection";
import { HomeTeaser } from "@/components/sections/HomeTeaser";

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <HomeTeaser />
            <ClosingSection />
        </>
    );
}
