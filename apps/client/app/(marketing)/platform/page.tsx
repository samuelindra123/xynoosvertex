import type { Metadata } from "next";
import { PlatformPage } from "./PlatformPage";

export const metadata: Metadata = {
    title: "Platform — Xynoos Vertex",
    description:
        "Four composable layers. One coherent system. Explore the infrastructure, intelligence, control, and integration architecture of Xynoos Vertex.",
};

export default function Page() {
    return <PlatformPage />;
}
