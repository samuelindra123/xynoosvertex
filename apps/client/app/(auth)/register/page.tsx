import type { Metadata } from "next";
import { RegisterPage } from "./RegisterPage";

export const metadata: Metadata = {
    title: "Create Account — Xynoos Vertex",
    description: "Create your Xynoos Vertex account. Start managing IoT projects and engineering designs.",
};

export default function Page() {
    return <RegisterPage />;
}
