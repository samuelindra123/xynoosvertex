import type { Metadata } from "next";
import { ModelingGalleryPage } from "./ModelingGalleryPage";

export const metadata: Metadata = {
    title: "3D Modeling Gallery — Xynoos Vertex",
    description:
        "Portfolio of our 3D modeling and product design work. Browse CAD designs, product prototypes, mechanical parts, and industrial enclosures.",
};

export default function Page() {
    return <ModelingGalleryPage />;
}
