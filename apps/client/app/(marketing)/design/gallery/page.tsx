import type { Metadata } from "next";
import { GalleryPage } from "./GalleryPage";

export const metadata: Metadata = {
    title: "Design Gallery — Xynoos Vertex",
    description:
        "Portfolio of our PCB design and IoT engineering work. Browse real project examples including trace routing, silkscreen designs, and assembled boards.",
};

export default function Page() {
    return <GalleryPage />;
}
