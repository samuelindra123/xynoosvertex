import type { Metadata } from "next";
import { ModelingOrderPage } from "./ModelingOrderPage";

export const metadata: Metadata = {
    title: "Order 3D Modeling — Xynoos Vertex",
    description: "Configure and order your custom 3D modeling project. Select specifications and get an instant quote.",
};

export default function Page() {
    return <ModelingOrderPage />;
}
