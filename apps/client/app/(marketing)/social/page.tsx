import type { Metadata } from "next";
import { SocialPage } from "./SocialPage";

export const metadata: Metadata = {
    title: "Xynoos Social — Social Media Platform",
    description:
        "A next-generation social media platform with integrated cloud storage. Connect, share, and build communities.",
};

export default function Page() {
    return <SocialPage />;
}
