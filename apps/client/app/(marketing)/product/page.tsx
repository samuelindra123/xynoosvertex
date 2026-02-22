import type { Metadata } from "next";
import { ProductPage } from "./ProductPage";

export const metadata: Metadata = {
    title: "Products & Services — Xynoos Vertex",
    description:
        "Social media platform, cloud storage, PCB design, 3D modeling, and web development services by Xynoos Vertex.",
};

export default function Page() {
    return <ProductPage />;
}
