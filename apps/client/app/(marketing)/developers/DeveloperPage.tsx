"use client";

import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import { PageLayout } from "@/components/system/PageLayout";
import { Container } from "@/components/system/Container";
import Link from "next/link";
import { useEffect, useState } from "react";

/* ─────────────────── Role rotation ─────────────────── */
const roles = ["Fullstack Developer", "IoT Engineer", "PCB Designer", "AI Builder", "Founder of Xynoos Vertex"];

function useRoleRotation(interval = 3000) {
    const [idx, setIdx] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => setIdx((i) => (i + 1) % roles.length), interval);
        return () => clearInterval(timer);
    }, [interval]);
    return idx;
}

/* ─────────────────── Animated counter ─────────────────── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (v) => Math.round(v));
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        const controls = animate(count, target, { duration: 2, ease: "easeOut" });
        const unsub = rounded.on("change", (v) => setDisplay(v));
        return () => { controls.stop(); unsub(); };
    }, [count, rounded, target]);

    return <>{display}{suffix}</>;
}

/* ─────────────────── Data ─────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
    }),
};

/* ── Tech icons (simplified SVG logos) ── */
const I = ({ children, c }: { children: React.ReactNode; c: string }) => (
    <span className={`inline-flex items-center justify-center w-5 h-5 ${c}`}>{children}</span>
);

const icons = {
    nextjs: <I c="text-white"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.251 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.572 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" /></svg></I>,
    react: <I c="text-cyan-400"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.31 0-.592.068-.852.2-1.56.792-1.37 4.21.6 8.35-3.49 1.1-5.78 2.85-5.78 4.472 0 3.67 6.66 6.72 14.87 6.72S24 18.09 24 14.42c0-1.62-2.29-3.37-5.78-4.47 1.97-4.14 2.16-7.56.6-8.35a1.64 1.64 0 0 0-.85-.2zM12 16.92c-2.73 0-4.942-2.21-4.942-4.93 0-2.73 2.21-4.93 4.942-4.93 2.73 0 4.94 2.2 4.94 4.93 0 2.72-2.21 4.93-4.94 4.93z" /></svg></I>,
    vue: <I c="text-emerald-400"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M24 1.61h-9.94L12 5.16 9.94 1.61H0l12 20.78ZM12 14.08 5.16 2.23h4.43L12 6.41l2.41-4.18h4.43Z" /></svg></I>,
    tailwind: <I c="text-sky-400"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" /></svg></I>,
    typescript: <I c="text-blue-400"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.42.276.69.399.57.245.902.365a11.108 11.108 0 0 1 1.367.614c.408.22.76.473 1.05.76.29.285.508.615.653.99.146.374.219.788.219 1.241 0 .636-.132 1.178-.399 1.627a3.177 3.177 0 0 1-1.074 1.085c-.45.285-.971.494-1.564.627a8.11 8.11 0 0 1-1.873.199c-.673 0-1.282-.063-1.825-.188a8.369 8.369 0 0 1-1.467-.48v-2.662c.252.2.528.376.83.529.3.153.619.276.957.37a4.49 4.49 0 0 0 1.573.169c.3-.009.567-.048.8-.117a2.01 2.01 0 0 0 .574-.26.848.848 0 0 0 .336-.36.898.898 0 0 0 .107-.436c0-.224-.069-.417-.204-.581a2.152 2.152 0 0 0-.574-.467 6.419 6.419 0 0 0-.882-.416c-.34-.133-.71-.282-1.11-.445a12.158 12.158 0 0 1-1.246-.588 4.676 4.676 0 0 1-.972-.762 3.085 3.085 0 0 1-.638-1.017c-.15-.397-.227-.846-.227-1.348 0-.617.133-1.153.399-1.61a3.426 3.426 0 0 1 1.073-1.1c.448-.285.964-.494 1.548-.63a7.593 7.593 0 0 1 1.822-.2zM10.5 12.75H8.25v7.5H5.625v-7.5H3.375V10.5H10.5z" /></svg></I>,
    node: <I c="text-green-400"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339a.29.29 0 0 0 .272 0l8.795-5.076a.277.277 0 0 0 .134-.238V6.921a.28.28 0 0 0-.137-.242L12.135 1.606a.27.27 0 0 0-.27 0L3.078 6.68a.282.282 0 0 0-.14.243v10.15a.27.27 0 0 0 .138.235l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675a1.857 1.857 0 0 1-.922-1.604V6.921c0-.659.353-1.275.922-1.603l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.57.329.924.944.924 1.603v10.15a1.86 1.86 0 0 1-.924 1.604l-8.795 5.078c-.28.163-.6.247-.924.247z" /></svg></I>,
    nest: <I c="text-red-400"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M14.131.047c-.173 0-.334.037-.483.087.416.208.67.526.857.905.035.073.065.148.09.225.012.037.025.073.034.111l.019.086c.09.453.063.817-.058 1.25a3.82 3.82 0 0 1-.112.327c-.037.091-.078.178-.122.264-.202.394-.51.728-.74 1.098-.113.183-.206.378-.262.587-.018.067-.028.136-.035.205.054-.02.108-.045.164-.06.147-.038.3-.054.45-.067.12-.009.238-.017.35-.042a5.37 5.37 0 0 0 .594-.14c.185-.058.376-.133.555-.186.07-.02.14-.035.213-.04.075-.003.153.01.218.052.173.104.192.357.175.555-.019.233-.082.44-.147.644-.07.215-.15.424-.236.628-.084.196-.173.39-.267.578-.096.19-.2.378-.31.56l-.026.042.012.024a2.618 2.618 0 0 1 .307-.127 3.474 3.474 0 0 1 1.2-.184c.162.005.322.023.48.054.131.025.258.063.376.118l.102.058c.056.038.104.087.137.149a.403.403 0 0 1 .043.223c-.015.166-.11.308-.217.426-.126.14-.27.266-.41.393a11.39 11.39 0 0 0-1.046 1.07c-.312.38-.58.8-.777 1.256-.028.067-.056.136-.08.205-.087.256-.146.52-.173.79-.017.17-.02.343.013.508.024.121.062.24.134.34.024.033.052.063.084.088.111.086.26.102.397.09.186-.015.362-.073.53-.143.234-.098.457-.22.672-.355l.298-.192c.096-.063.19-.13.28-.202.38-.305.695-.676.949-1.093a6.95 6.95 0 0 0 .756-1.874c.075-.298.133-.6.166-.907.015-.146.024-.293.022-.44-.002-.18-.016-.362-.066-.535a1.08 1.08 0 0 0-.127-.31c-.287-.45-.83-.634-1.327-.73a4.898 4.898 0 0 0-1.03-.105h-.12c.195-.207.378-.425.55-.652.314-.414.59-.858.82-1.325a7.88 7.88 0 0 0 .367-.889l.034-.106c.054-.18.088-.366.088-.556 0-.246-.068-.49-.225-.673-.24-.28-.576-.383-.923-.383z" /></svg></I>,
    laravel: <I c="text-orange-400"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M23.642 5.43a.364.364 0 0 1 .014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 0 1-.188.326L9.93 23.949a.316.316 0 0 1-.066.027c-.008.002-.016.008-.024.01a.348.348 0 0 1-.192 0c-.011-.002-.02-.008-.03-.012a.27.27 0 0 1-.06-.023L.533 18.755a.376.376 0 0 1-.189-.326V2.974c0-.033.005-.066.014-.098.003-.012.01-.02.014-.032a.369.369 0 0 1 .023-.058c.004-.013.015-.022.023-.033l.033-.045c.012-.01.025-.018.037-.027a.336.336 0 0 1 .05-.027L5.1.063a.36.36 0 0 1 .35 0l4.56 2.632c.019.009.034.024.05.035l.035.027a.349.349 0 0 1 .055.078l.014.03a.372.372 0 0 1 .038.13v9.575l3.768-2.174V5.527c0-.035.005-.067.014-.1.004-.01.01-.02.015-.032a.37.37 0 0 1 .023-.058c.006-.01.015-.022.024-.033l.032-.045c.012-.012.025-.02.038-.028.014-.01.029-.023.05-.027L18.56 2.5a.36.36 0 0 1 .35 0l4.56 2.631.05.028c.012.009.025.017.036.028.012.013.022.03.033.045l.024.033c.011.02.016.038.024.058.004.012.01.021.013.032z" /></svg></I>,
    fastapi: <I c="text-teal-400"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0C5.375 0 0 5.375 0 12c0 6.627 5.375 12 12 12 6.626 0 12-5.373 12-12 0-6.625-5.373-12-12-12zm-.624 21.62v-7.528H7.19L13.203 2.38v7.528h4.029L11.376 21.62z" /></svg></I>,
    postgres: <I c="text-blue-300"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02A10.922 10.922 0 0 0 12.6.258C11.422.238 10.41.524 9.594 1 8.79.721 7.122.24 5.364.336 4.14.403 2.804.775 1.814 1.82.827 2.865.305 4.482.415 6.682c.03.607.203 1.597.49 2.879s.69 2.783 1.193 4.152c.503 1.37 1.054 2.6 1.915 3.436.43.419 1.022.771 1.72.742.49-.02.933-.235 1.315-.552.186.245.385.352.566.451.228.125.45.21.68.266.413.103 1.12.241 1.948.1.282-.047.579-.139.875-.27.01.33.024.653.037.98.041 1.036.067 1.993.378 2.832.05.137.187.843.727 1.466.54.624 1.598 1.013 2.783.596.857-.303 1.438-.848 1.81-1.526.372-.678.584-1.468.72-2.261.073-.428.14-.863.2-1.312l.015-.006c.455-.163.85-.378 1.248-.645.318.063.64.098.96.098 1.094 0 2.07-.37 2.7-1.033.198-.21.38-.463.438-.79.06-.326-.03-.726-.312-1.07.124-.19.24-.39.336-.6.263-.57.378-1.154.32-1.7a2.26 2.26 0 0 0-.147-.621c.134-.164.242-.335.336-.532.179-.377.25-.801.205-1.252-.046-.452-.193-.937-.489-1.397a5.49 5.49 0 0 0-.358-.472c-.03-.066-.058-.132-.09-.197-.254-.49-.6-.918-1.006-1.275-.407-.358-.87-.645-1.35-.848-.48-.203-.978-.331-1.444-.39a7.468 7.468 0 0 0-1.152-.058z" /></svg></I>,
    mysql: <I c="text-amber-400"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 0 0-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01c-.075 1.41-.127 2.82-.162 4.41H0c.055-1.966.126-3.932.297-5.897h1.15l1.273 3.95h.008l1.273-3.95h1.13c.186 2.01.27 3.97.347 5.897zm2.84-4.21a3.25 3.25 0 0 0-.143 1.064c0 .55.12.963.36 1.24s.57.414.992.414c.368 0 .68-.117.94-.35.26-.234.49-.59.69-1.065h.008c-.016.467-.025.83-.025 1.086v.96h.86V14.48h.85c-.04.29-.06.59-.06.9 0 .554.12.964.36 1.234.24.27.57.405.99.405.38 0 .69-.117.95-.35.26-.233.49-.59.69-1.064h.01c-.02.467-.03.83-.03 1.085v.96h.86V14.48H18a8.58 8.58 0 0 1-.06.9c0 .554.12.965.36 1.235.24.27.57.405.99.405.38 0 .69-.117.95-.35.26-.234.49-.59.69-1.065h.01c-.02.467-.03.83-.03 1.086v.96h.86V12.8h-.86v.28c-.23-.24-.57-.36-1.013-.36-.39 0-.726.13-1 .388-.273.26-.487.623-.64 1.09-.016-.46-.025-.82-.025-1.08V12.8h-.86v.28c-.23-.24-.57-.36-1.01-.36-.39 0-.73.13-1 .388-.27.26-.49.623-.65 1.09-.01-.46-.02-.82-.02-1.08V12.8h-.86v.28c-.23-.24-.57-.36-1.01-.36-.39 0-.73.13-1 .39-.273.26-.487.622-.642 1.09-.016-.46-.025-.82-.025-1.08V12.8h-.86v1.68z" /></svg></I>,
    mongodb: <I c="text-green-500"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.639-8.464c.01-.814-.103-1.662-.197-2.218z" /></svg></I>,
    kafka: <I c="text-neutral-200"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.248 18.362c-.625 0-1.178-.292-1.542-.747l-2.066 1.198c.045.185.073.375.073.572a2.352 2.352 0 1 1-2.352-2.352c.562 0 1.074.2 1.478.533l2.078-1.204a2.338 2.338 0 0 1-.104-.688c0-.252.041-.494.115-.722l-2.084-1.207a2.333 2.333 0 0 1-1.483.536 2.352 2.352 0 1 1 0-4.704c.563 0 1.076.201 1.48.535l2.09-1.211a2.35 2.35 0 0 1-.11-.702 2.352 2.352 0 1 1 2.352 2.352c-.563 0-1.076-.201-1.48-.535l-2.09 1.211c.069.222.11.457.11.702s-.04.48-.11.702l2.09 1.211a2.333 2.333 0 0 1 1.48-.535 2.352 2.352 0 1 1 0 4.704z" /></svg></I>,
    docker: <I c="text-blue-400"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.186.186 0 0 0-.185-.186H5.136a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.186.186 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.186v1.887c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.287 2.61-2.134 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" /></svg></I>,
    kubernetes: <I c="text-blue-300"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M10.204 14.352l.007.01-.999 2.413a5.171 5.171 0 0 1-2.075-2.597l2.578-.437.004.005a.44.44 0 0 1 .484.606zm-.833-2.129a.44.44 0 0 0 .173-.756l.002-.011L7.585 9.7a5.143 5.143 0 0 0-.73 3.255l2.514-.725.002-.007zm1.9-1.418a.44.44 0 0 0 .636-.389h.013l.697-2.507a5.16 5.16 0 0 0-3.064.953l1.718 1.943zm3.08 2.193a.44.44 0 0 0-.185.74l-.004.013 1.957 1.754a5.134 5.134 0 0 0 .662-3.166l-2.43.66zm-.755 1.63a.44.44 0 0 0-.706.282l-.01.005-1.047 2.393a5.171 5.171 0 0 0 3.087-.878l-1.324-1.802zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.644 16.156a.56.56 0 0 1-.354.18c-.09.01-.18.001-.266-.025l-2.282-.685a6.14 6.14 0 0 1-2.974 2.066l-.457 2.34a.56.56 0 0 1-.578.442 6.28 6.28 0 0 1-1.468 0 .551.551 0 0 1-.576-.443l-.457-2.34a6.14 6.14 0 0 1-2.974-2.066l-2.282.685a.56.56 0 0 1-.62-.155 6.198 6.198 0 0 1-1.038-1.268.56.56 0 0 1 .065-.644l1.678-1.777a6.16 6.16 0 0 1-.046-3.598l-1.678-1.777a.56.56 0 0 1-.065-.644 6.198 6.198 0 0 1 1.038-1.268.56.56 0 0 1 .62-.155l2.282.685a6.14 6.14 0 0 1 2.974-2.066l.457-2.34a.56.56 0 0 1 .576-.443 6.28 6.28 0 0 1 1.468 0 .56.56 0 0 1 .578.442l.457 2.34a6.14 6.14 0 0 1 2.974 2.066l2.282-.685a.56.56 0 0 1 .62.155 6.2 6.2 0 0 1 1.038 1.268.561.561 0 0 1-.065.644l-1.678 1.777a6.16 6.16 0 0 1 .046 3.598l1.678 1.777c.14.167.18.4.065.644a6.2 6.2 0 0 1-1.038 1.268z" /></svg></I>,
    digitalocean: <I c="text-blue-300"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12.04 0C5.408-.02.005 5.37.005 11.992h4.638c0-4.923 4.882-8.731 10.064-6.855a6.95 6.95 0 0 1 4.147 4.148c1.889 5.177-1.924 10.055-6.84 10.064v-4.61H7.391v4.623h4.623V24c7.86 0 13.881-7.357 11.458-15.473A11.992 11.992 0 0 0 12.04 0z" /></svg></I>,
    github: <I c="text-neutral-200"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg></I>,
    esp: <I c="text-yellow-400"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="16" height="16" rx="2" /><circle cx="12" cy="12" r="3" /><path d="M12 4v3M12 17v3M4 12h3M17 12h3" /></svg></I>,
    arduino: <I c="text-teal-300"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.4A5.2 5.2 0 0 0 7 5.7c-.4.6-.7 1.3-1 2-.4 1-1 1.7-1.8 2.3-.8.5-1.7.8-2.7.8H0v2.4h1.5c1 0 1.9.3 2.7.8.8.6 1.4 1.3 1.8 2.3.3.7.6 1.4 1 2A5.2 5.2 0 0 0 12 21.6a5.2 5.2 0 0 0 4.9-3.3c.4-.6.7-1.3 1-2 .4-1 1-1.7 1.8-2.3.8-.5 1.7-.8 2.7-.8H24v-2.4h-1.5c-1 0-1.9-.3-2.7-.8-.8-.6-1.4-1.3-1.8-2.3-.3-.7-.6-1.4-1-2A5.2 5.2 0 0 0 12 2.4z" /></svg></I>,
    easyeda: <I c="text-blue-300"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 12h4l3-8 4 16 3-8h4" /></svg></I>,
    cpp: <I c="text-violet-300"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.34.293 1.848 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.003-.294-.1-.62-.268-.91zM12 19.11c-3.92 0-7.109-3.19-7.109-7.11 0-3.92 3.19-7.11 7.11-7.11a7.133 7.133 0 0 1 6.156 3.553l-3.076 1.78a3.567 3.567 0 0 0-3.08-1.78A3.56 3.56 0 0 0 8.444 12 3.56 3.56 0 0 0 12 15.555a3.57 3.57 0 0 0 3.08-1.778l3.078 1.78A7.135 7.135 0 0 1 12 19.11zm7.11-6.715h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79zm2.962 0h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79z" /></svg></I>,
    openai: <I c="text-emerald-300"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.998 5.998 0 0 0-3.998 2.9 6.05 6.05 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" /></svg></I>,
};

type TechItem = { name: string; icon: React.ReactNode };

const techStack: Record<string, TechItem[]> = {
    Frontend: [
        { name: "Next.js", icon: icons.nextjs },
        { name: "React", icon: icons.react },
        { name: "Vue.js", icon: icons.vue },
        { name: "Tailwind CSS", icon: icons.tailwind },
        { name: "TypeScript", icon: icons.typescript },
    ],
    Backend: [
        { name: "Node.js", icon: icons.node },
        { name: "NestJS", icon: icons.nest },
        { name: "Laravel", icon: icons.laravel },
        { name: "FastAPI", icon: icons.fastapi },
    ],
    Database: [
        { name: "PostgreSQL", icon: icons.postgres },
        { name: "MySQL", icon: icons.mysql },
        { name: "MongoDB", icon: icons.mongodb },
        { name: "Kafka", icon: icons.kafka },
    ],
    "DevOps & Infra": [
        { name: "Docker", icon: icons.docker },
        { name: "Kubernetes", icon: icons.kubernetes },
        { name: "DigitalOcean", icon: icons.digitalocean },
        { name: "GitHub CI/CD", icon: icons.github },
    ],
    "IoT & Electronics": [
        { name: "ESP8266", icon: icons.esp },
        { name: "Arduino", icon: icons.arduino },
        { name: "EasyEDA", icon: icons.easyeda },
        { name: "C++", icon: icons.cpp },
    ],
    "AI / ML": [
        { name: "LLM Integration", icon: icons.openai },
        { name: "AI Agents", icon: icons.openai },
        { name: "RAG", icon: icons.openai },
        { name: "OpenAI API", icon: icons.openai },
    ],
};

const projects = [
    {
        title: "Renunganku",
        description: "A social media platform for sharing Christian devotional content — connecting communities through meaningful spiritual reflections.",
        stack: ["Next.js", "Laravel", "PostgreSQL"],
        status: "Active",
        statusColor: "text-emerald-400 border-emerald-400/20 bg-emerald-400/[0.08]",
        accent: "from-blue-500/[0.06]",
        borderAccent: "hover:border-blue-500/20",
    },
    {
        title: "Multivendor Marketplace",
        description: "A full-featured e-commerce marketplace platform supporting multiple vendors — commercial web development through Xynoos Vertex.",
        stack: ["Next.js", "Laravel", "PostgreSQL"],
        status: "Active",
        statusColor: "text-emerald-400 border-emerald-400/20 bg-emerald-400/[0.08]",
        accent: "from-amber-500/[0.06]",
        borderAccent: "hover:border-amber-500/20",
    },
    {
        title: "Smart Home IoT System",
        description: "A custom-built smart home system using ESP8266/NodeMCU — the hardware engineering expertise behind Xynoos Vertex's PCB design services.",
        stack: ["C++", "MQTT", "ESP8266", "Node.js"],
        status: "Active",
        statusColor: "text-emerald-400 border-emerald-400/20 bg-emerald-400/[0.08]",
        accent: "from-emerald-500/[0.06]",
        borderAccent: "hover:border-emerald-500/20",
    },
    {
        title: "Xynoos Vertex",
        description: "The platform you're looking at right now — social media, cloud storage, PCB design services, and web development under one company.",
        stack: ["Next.js", "TypeScript", "Tailwind"],
        status: "In Progress",
        statusColor: "text-amber-400 border-amber-400/20 bg-amber-400/[0.08]",
        accent: "from-violet-500/[0.06]",
        borderAccent: "hover:border-violet-500/20",
    },
];

const experience = [
    {
        role: "Founder & Lead Developer",
        company: "Xynoos Vertex",
        period: "2023 — Present",
        description: "Building and leading the development of Xynoos Social, Cloud Storage, and the full suite of engineering services.",
        active: true,
    },
    {
        role: "Freelance Fullstack Developer",
        company: "Self-Employed",
        period: "2023 — Present",
        description: "Taking on commercial web development, IoT, and design projects for clients across Indonesia.",
        active: true,
    },
    {
        role: "Industrial Electronics Intern",
        company: "PT Cendana Teknika Utama, Malang",
        period: "2025",
        description: "Hands-on experience in industrial electronics, PCB manufacturing processes, and embedded systems.",
        active: false,
    },
    {
        role: "Planned Internship",
        company: "VEDC Arjosari",
        period: "Upcoming",
        description: "Expanding into advanced electronics and vocational engineering development.",
        active: false,
    },
];

/* ─────────────────── Component ─────────────────── */
export function DeveloperPage() {
    const roleIdx = useRoleRotation();

    return (
        <PageLayout>
            {/* ── Hero ── */}
            <section className="relative min-h-[80vh] flex items-end overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-[0.03]">
                        <svg width="700" height="700" viewBox="0 0 700 700" fill="none">
                            <circle cx="350" cy="350" r="320" stroke="white" strokeWidth="0.5" />
                            <circle cx="350" cy="350" r="220" stroke="white" strokeWidth="0.5" />
                            <circle cx="350" cy="350" r="120" stroke="white" strokeWidth="0.5" />
                            <line x1="350" y1="0" x2="350" y2="700" stroke="white" strokeWidth="0.3" />
                            <line x1="0" y1="350" x2="700" y2="350" stroke="white" strokeWidth="0.3" />
                        </svg>
                    </div>
                    <div className="absolute top-0 right-1/4 w-[700px] h-[700px] rounded-full bg-blue-500/[0.04] blur-[140px]" />
                    <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/[0.03] blur-[100px]" />
                </div>



                <Container className="relative pt-40 pb-20">
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em]">
                                The Developer Behind Vertex
                            </span>
                        </div>
                        <div className="w-8 h-px bg-blue-500/40" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="mb-2"
                    >
                        <span className="text-blue-400/80 text-[14px] font-mono tracking-wide">
                            Hi, I&apos;m
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="text-[clamp(2.2rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white mb-5"
                    >
                        Samuel Indra Bastian.{" "}
                        <span className="text-neutral-500">Xynoos.</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="mb-6"
                    >
                        <span className="text-[clamp(1rem,2.5vw,1.35rem)] text-neutral-500 font-medium">
                            A 17 y/o{" "}
                            <span className="relative inline-block h-[1.4em] overflow-hidden align-bottom min-w-[320px]">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={roles[roleIdx]}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                                        className="absolute left-0 text-blue-400"
                                    >
                                        {roles[roleIdx]}
                                    </motion.span>
                                </AnimatePresence>
                            </span>
                        </span>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="text-neutral-400 text-[17px] leading-relaxed max-w-[560px] mb-10"
                    >
                        Building real-world products from Malang, Indonesia.
                        From social platforms and AI systems to IoT hardware and PCB design —
                        I build the entire stack behind{" "}
                        <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
                            Xynoos Vertex
                        </Link>.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.45 }}
                        className="flex flex-wrap gap-3"
                    >
                        <Link
                            href="/product"
                            className="inline-flex items-center justify-center h-[42px] px-6 bg-white text-neutral-950 text-[14px] font-medium rounded-lg hover:bg-neutral-100 transition-all"
                        >
                            See My Products
                        </Link>
                        <a
                            href="https://github.com/devwebxyn"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 justify-center h-[42px] px-6 border border-white/[0.1] text-neutral-300 text-[14px] rounded-lg hover:bg-white/[0.04] transition-all"
                        >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            GitHub
                        </a>
                    </motion.div>
                </Container>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
            </section>

            {/* ── Stats ── */}
            <Container className="py-12">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-12 md:gap-16"
                >
                    {[
                        { label: "Projects", value: 4, suffix: "+" },
                        { label: "Tech Stack", value: 20, suffix: "+" },
                        { label: "Years Coding", value: 3, suffix: "+" },
                        { label: "Age", value: 17, suffix: "" },
                    ].map((stat) => (
                        <div key={stat.label}>
                            <div className="text-white text-[28px] font-semibold tracking-tight leading-none mb-1">
                                <Counter target={stat.value} suffix={stat.suffix} />
                            </div>
                            <div className="text-neutral-600 text-[11px] uppercase tracking-[0.15em]">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </Container>

            {/* ── About / Story ── */}
            <section className="border-t border-white/[0.06]">
                <Container className="py-24 md:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-3">
                            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-3">About</span>
                            <div className="w-8 h-px bg-blue-500/40" />
                        </motion.div>
                        <div className="lg:col-span-9 space-y-6">
                            <motion.p custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-neutral-200 text-[20px] leading-[1.7] font-medium tracking-[-0.01em]">
                                I&apos;m Samuel — most people online know me as <span className="text-blue-400">Xynoos</span>.
                                A 17-year-old fullstack developer from Malang, East Java, currently studying
                                Industrial Electronics at SMK PGRI 3 Malang.
                            </motion.p>
                            <motion.p custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-neutral-400 text-[16px] leading-[1.8]">
                                I started coding because I wanted to build things that matter. That curiosity turned into
                                <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors"> Xynoos Vertex</Link> — where I build everything from the{" "}
                                <Link href="/social" className="text-blue-400 hover:text-blue-300 transition-colors">social media platform</Link> and{" "}
                                <Link href="/storage" className="text-blue-400 hover:text-blue-300 transition-colors">cloud storage</Link> to the{" "}
                                <Link href="/design" className="text-blue-400 hover:text-blue-300 transition-colors">PCB design services</Link> and{" "}
                                <Link href="/webdev" className="text-blue-400 hover:text-blue-300 transition-colors">web development</Link> offerings.
                            </motion.p>
                            <motion.p custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-neutral-400 text-[16px] leading-[1.8]">
                                I don&apos;t believe age defines capability. While my classmates study textbooks, I ship production code,
                                design circuit boards, train AI models, and build IoT devices. Every product in Xynoos Vertex
                                is something I&apos;ve architected and built myself — not as a student project,
                                but as real products for real users.
                            </motion.p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* ── Tech Stack ── */}
            <section className="border-t border-white/[0.06]">
                <Container className="py-24 md:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
                        <div className="lg:col-span-3">
                            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-3">Tech Stack</span>
                            <div className="w-8 h-px bg-blue-500/40" />
                        </div>
                        <div className="lg:col-span-9">
                            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-white">
                                Tools I use <span className="text-neutral-500">every day.</span>
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(techStack).map(([category, techs], i) => (
                            <motion.div
                                key={category}
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-40px" }}
                                className="group p-6 rounded-2xl border border-white/[0.06] bg-white/[0.01] hover:border-blue-500/15 hover:bg-white/[0.02] transition-all duration-500"
                            >
                                <h3 className="text-[12px] font-mono text-neutral-500 uppercase tracking-[0.12em] mb-5">
                                    {category}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {techs.map((tech) => (
                                        <span
                                            key={tech.name}
                                            className="inline-flex items-center gap-2 text-[12px] font-medium text-neutral-300 px-3 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all cursor-default"
                                        >
                                            {tech.icon}
                                            {tech.name}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ── Projects ── */}
            <section className="border-t border-white/[0.06]">
                <Container className="py-24 md:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
                        <div className="lg:col-span-3">
                            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-3">Featured Projects</span>
                            <div className="w-8 h-px bg-blue-500/40" />
                        </div>
                        <div className="lg:col-span-9">
                            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-white">
                                What I&apos;m <span className="text-neutral-500">building.</span>
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects.map((project, i) => (
                            <motion.div
                                key={project.title}
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-40px" }}
                                className={`group relative p-8 rounded-2xl border border-white/[0.06] bg-gradient-to-br ${project.accent} to-transparent ${project.borderAccent} transition-all duration-500 overflow-hidden`}
                            >
                                <div className="relative">
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className="text-white text-[18px] font-semibold tracking-[-0.01em]">
                                            {project.title}
                                        </h3>
                                        <span className={`text-[9px] font-mono tracking-[0.12em] uppercase px-2.5 py-1 rounded-full border shrink-0 ml-3 ${project.statusColor}`}>
                                            {project.status}
                                        </span>
                                    </div>
                                    <p className="text-neutral-400 text-[14px] leading-[1.7] mb-5">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.stack.map((tech) => (
                                            <span key={tech} className="text-[11px] text-blue-400/60 font-mono px-2.5 py-1 rounded border border-blue-500/10 bg-blue-500/[0.04]">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ── Experience ── */}
            <section className="border-t border-white/[0.06]">
                <Container className="py-24 md:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
                        <div className="lg:col-span-3">
                            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-3">Experience</span>
                            <div className="w-8 h-px bg-blue-500/40" />
                        </div>
                        <div className="lg:col-span-9">
                            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-white">
                                Where I&apos;ve <span className="text-neutral-500">been.</span>
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        <div className="lg:col-span-3" />
                        <div className="lg:col-span-9">
                            <div className="relative">
                                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/[0.06]" />
                                <div className="space-y-10">
                                    {experience.map((exp, i) => (
                                        <motion.div key={exp.company + exp.role} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative pl-10">
                                            <div className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 ${exp.active ? "border-blue-400 bg-blue-500/20" : "border-neutral-700 bg-neutral-900"}`} />
                                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                                <h3 className="text-white text-[17px] font-semibold tracking-[-0.01em]">{exp.role}</h3>
                                                <span className="text-[11px] font-mono text-blue-400/60">{exp.period}</span>
                                            </div>
                                            <div className="text-[13px] text-neutral-500 mb-2">{exp.company}</div>
                                            <p className="text-neutral-400 text-[14px] leading-[1.7]">{exp.description}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* ── Current Focus ── */}
            <section className="border-t border-white/[0.06]">
                <Container className="py-24 md:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
                        <div className="lg:col-span-3">
                            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.2em] block mb-3">Current Focus</span>
                            <div className="w-8 h-px bg-blue-500/40" />
                        </div>
                        <div className="lg:col-span-9">
                            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-white">
                                What drives me <span className="text-neutral-500">right now.</span>
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {[
                            {
                                title: "Scaling Xynoos Vertex",
                                description: "Building multiple production products simultaneously — social media, cloud storage, and professional services.",
                                icon: (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                    </svg>
                                ),
                            },
                            {
                                title: "AI & LLM Integration",
                                description: "Deepening expertise in AI agent systems, retrieval-augmented generation, and microservices architecture.",
                                icon: (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.57-3.25 3.93A2 2 0 0 0 11 12v1" />
                                        <path d="M12 17v.01" />
                                        <circle cx="12" cy="12" r="10" />
                                    </svg>
                                ),
                            },
                            {
                                title: "Content Creation",
                                description: "Sharing the journey through YouTube, live coding streams, and documenting the process of building Vertex.",
                                icon: (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="23 7 16 12 23 17 23 7" />
                                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                                    </svg>
                                ),
                            },
                            {
                                title: "Self-Hosted Infrastructure",
                                description: "Running and managing self-hosted AI solutions, databases, and deployment pipelines on my own servers.",
                                icon: (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                                        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                                        <line x1="6" y1="6" x2="6.01" y2="6" />
                                        <line x1="6" y1="18" x2="6.01" y2="18" />
                                    </svg>
                                ),
                            },
                        ].map((focus, i) => (
                            <motion.div
                                key={focus.title}
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-40px" }}
                                className="group flex gap-5 p-7 rounded-2xl border border-white/[0.06] bg-white/[0.01] hover:border-blue-500/15 hover:bg-white/[0.02] transition-all duration-500"
                            >
                                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] text-neutral-400 group-hover:text-blue-400 group-hover:border-blue-500/20 transition-all duration-300 shrink-0">
                                    {focus.icon}
                                </div>
                                <div>
                                    <h3 className="text-white text-[16px] font-semibold mb-2 tracking-[-0.01em]">{focus.title}</h3>
                                    <p className="text-neutral-500 text-[13px] leading-[1.7]">{focus.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ── Contact CTA ── */}
            <section className="border-t border-white/[0.06]">
                <Container className="py-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-neutral-500 text-[15px] mb-8">
                            Open to freelance projects, collaborations, and internship opportunities.
                        </p>
                        <div className="flex items-center justify-center gap-4 flex-wrap mb-10">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center h-[42px] px-7 bg-white text-neutral-950 text-[14px] font-medium rounded-lg hover:bg-neutral-100 transition-all"
                            >
                                Get in Touch
                            </Link>
                            <a
                                href="https://github.com/devwebxyn"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 justify-center h-[42px] px-7 border border-white/[0.1] text-neutral-300 text-[14px] rounded-lg hover:bg-white/[0.04] transition-all"
                            >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                GitHub
                            </a>
                        </div>

                        <div className="flex items-center justify-center gap-6 flex-wrap text-[13px]">
                            <div className="flex items-center gap-2 text-neutral-500">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                Malang, East Java, Indonesia
                            </div>
                            <div className="flex items-center gap-2 text-neutral-500">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                                Available for projects
                            </div>
                        </div>
                    </motion.div>
                </Container>
            </section>
        </PageLayout>
    );
}
