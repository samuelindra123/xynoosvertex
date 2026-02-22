import type { Metadata } from "next";
import { StoragePage } from "./StoragePage";

export const metadata: Metadata = {
    title: "Cloud Storage — Xynoos Vertex",
    description:
        "Enterprise-grade cloud storage integrated into the Xynoos Social platform. Secure, fast, and always accessible.",
};

export default function Page() {
    return <StoragePage />;
}
