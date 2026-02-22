import type { Metadata } from "next";
import { PrivacyPage } from "./PrivacyPage";

export const metadata: Metadata = {
    title: "Privacy Policy — Xynoos Vertex",
    description: "How Xynoos Vertex handles, stores, and protects your personal data.",
};

export default function Page() {
    return <PrivacyPage />;
}
