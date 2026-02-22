import type { Metadata } from "next";
import { ContactPage } from "./ContactPage";

export const metadata: Metadata = {
    title: "Contact — Xynoos Vertex",
    description:
        "Get in touch with Xynoos Vertex. We're open to freelance projects, collaborations, and partnerships.",
};

export default function Page() {
    return <ContactPage />;
}
