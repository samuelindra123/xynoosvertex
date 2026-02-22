import type { Metadata } from "next";
import { PhilosophyPage } from "./PhilosophyPage";

export const metadata: Metadata = {
    title: "Philosophy — Xynoos Vertex",
    description:
        "The principles that define every engineering decision at Xynoos Vertex. Precision, human-centered systems, composable architecture, engineering-first design.",
};

export default function Page() {
    return <PhilosophyPage />;
}
