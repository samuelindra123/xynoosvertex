import type { Metadata } from "next";
import { ForgotPasswordPage } from "./ForgotPasswordPage";

export const metadata: Metadata = {
    title: "Reset Password — Xynoos Vertex",
    description: "Reset your Xynoos Vertex account password.",
};

export default function Page() {
    return <ForgotPasswordPage />;
}
