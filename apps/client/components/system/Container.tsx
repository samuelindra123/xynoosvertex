interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    as?: "div" | "section" | "article" | "main";
}

export function Container({
    children,
    className = "",
    as: Tag = "div",
}: ContainerProps) {
    return (
        <Tag className={`max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 ${className}`}>
            {children}
        </Tag>
    );
}
