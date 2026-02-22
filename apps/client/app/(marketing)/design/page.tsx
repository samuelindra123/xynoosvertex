import type { Metadata } from "next";
import { DesignPage } from "./DesignPage";

export const metadata: Metadata = {
    title: "Design Services — Xynoos Vertex",
    description:
        "Professional PCB design and 3D modeling services. Precision engineering by experienced designers.",
};

export default function Page() {
    return <DesignPage />;
}
