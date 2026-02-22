import type { Metadata } from "next";
import { VisiMisiPage } from "./VisiMisiPage";

export const metadata: Metadata = {
    title: "Visi & Misi — Xynoos Vertex",
    description:
        "The vision and mission of Xynoos Vertex. Building digital platforms and engineering services defined by quality, privacy, and trust.",
};

export default function Page() {
    return <VisiMisiPage />;
}
