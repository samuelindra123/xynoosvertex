import type { Metadata } from "next";
import { VisionPage } from "./VisionPage";

export const metadata: Metadata = {
    title: "Vision — Xynoos Vertex",
    description:
        "Why Xynoos Vertex exists. Our engineering mission, the philosophy behind the platform, and the future we are building toward.",
};

export default function Page() {
    return <VisionPage />;
}
