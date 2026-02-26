import { Suspense } from "react";
import { UserProfilePage } from "./UserProfilePage";

export default function Page({ params }: { params: Promise<{ userId: string }> }) {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="w-8 h-8 border-2 border-white/10 border-t-emerald-400 rounded-full animate-spin" /></div>}>
            <UserProfilePage paramsPromise={params} />
        </Suspense>
    );
}
