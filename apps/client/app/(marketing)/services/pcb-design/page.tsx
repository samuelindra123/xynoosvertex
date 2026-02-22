import type { Metadata } from "next";
import { PcbServicePage } from "./PcbServicePage";

export const metadata: Metadata = {
    title: "PCB Design Service — Xynoos Vertex",
    description: "Order custom PCB schematic design, layout, and manufacturing-ready Gerber files. From concept to production.",
};

export default function Page() {
    return <PcbServicePage />;
}
