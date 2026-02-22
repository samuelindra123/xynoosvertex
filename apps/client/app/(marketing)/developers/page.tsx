import type { Metadata } from "next";
import { DeveloperPage } from "./DeveloperPage";

export const metadata: Metadata = {
    title: "Developer — Samuel Indra Bastian | Xynoos Vertex",
    description:
        "Meet Samuel Indra Bastian (Ekahlia), the 17-year-old fullstack developer behind Xynoos Vertex. Building real-world products from Malang, Indonesia.",
};

export default function Page() {
    return <DeveloperPage />;
}
