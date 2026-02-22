import type { Metadata } from "next";
import { WebdevPage } from "./WebdevPage";

export const metadata: Metadata = {
    title: "Web Development — Xynoos Vertex",
    description:
        "Full-stack website development for commercial and non-commercial projects. Modern, scalable, and beautifully crafted.",
};

export default function Page() {
    return <WebdevPage />;
}
