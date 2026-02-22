import type { Metadata } from "next";
import { CompanyPage } from "./CompanyPage";

export const metadata: Metadata = {
    title: "Company — Xynoos Vertex",
    description:
        "Learn about Xynoos Vertex — the team, mission, and engineering culture behind the precision-built software infrastructure platform.",
};

export default function Page() {
    return <CompanyPage />;
}
