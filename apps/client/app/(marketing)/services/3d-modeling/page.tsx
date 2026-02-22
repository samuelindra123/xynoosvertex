import type { Metadata } from "next";
import { ModelingServicePage } from "./ModelingServicePage";

export const metadata: Metadata = {
    title: "3D Modeling Service — Xynoos Vertex",
    description: "Order custom 3D CAD modeling for enclosures, prototypes, and mechanical parts. From sketch to manufacturing.",
};

export default function Page() {
    return <ModelingServicePage />;
}
