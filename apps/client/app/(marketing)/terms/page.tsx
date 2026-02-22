import type { Metadata } from "next";
import { TermsPage } from "./TermsPage";

export const metadata: Metadata = {
    title: "Terms of Service — Xynoos Vertex",
    description: "Terms and conditions governing your use of Xynoos Vertex products and services.",
};

export default function Page() {
    return <TermsPage />;
}
