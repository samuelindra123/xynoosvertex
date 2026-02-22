import type { Metadata } from "next";
import { LoginPage } from "./LoginPage";

export const metadata: Metadata = {
    title: "Sign In — Xynoos Vertex",
    description: "Sign in to your Xynoos Vertex account to manage your projects and orders.",
};

export default function Page() {
    return <LoginPage />;
}
