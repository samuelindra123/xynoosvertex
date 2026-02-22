import type { Metadata } from "next";
import { EcosystemPage } from "./EcosystemPage";

export const metadata: Metadata = {
    title: "Ecosystem — Xynoos Vertex",
    description:
        "Modules, APIs, and integrations. Explore the Xynoos Vertex ecosystem — designed to grow with your systems.",
};

export default function Page() {
    return <EcosystemPage />;
}
