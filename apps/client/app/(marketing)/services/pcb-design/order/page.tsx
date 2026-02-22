import type { Metadata } from "next";
import { PcbOrderPage } from "./PcbOrderPage";

export const metadata: Metadata = {
    title: "Order PCB Design — Xynoos Vertex",
    description: "Configure and order your custom PCB design. Select specifications, upload files, and get an instant quote.",
};

export default function Page() {
    return <PcbOrderPage />;
}
