/**
 * Xynoos Vertex — Logo Symbol
 *
 * CONCEPT:
 * Three geometric planes converging at a single vertex point.
 * Each plane represents a core dimension of the platform:
 *   - Infrastructure (foundation, upward)
 *   - Intelligence (processing, left)
 *   - Control (governance, right)
 *
 * The three forms meet at a precise center node — the "vertex" —
 * the singular control point where all system dimensions intersect.
 *
 * GEOMETRY:
 * Three angular wedge shapes arranged at 120° intervals around center.
 * Each wedge tapers from its outer edge to meet at the center point.
 * A small negative-space circle at the center emphasizes the vertex node.
 * The overall silhouette suggests convergence, precision, and structure.
 *
 * DESIGN PRINCIPLES:
 * - Pure geometry, no decoration
 * - Works at 16px (favicon) through 512px+
 * - Single color — monochrome by default
 * - Balanced, centered, recognizable silhouette
 */

interface LogoProps {
    size?: number;
    color?: string;
    className?: string;
}

export function VertexLogo({
    size = 32,
    color = "currentColor",
    className = "",
}: LogoProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Xynoos Vertex logo"
        >
            {/*
        Three converging planes, 120° apart.
        Each is a quadrilateral that tapers toward center (50,50).
        The planes are designed so their outer edges form a subtle
        triangular boundary while the inner edges converge precisely.
      */}

            {/* Plane 1 — Top (Infrastructure): rises upward */}
            <path
                d="M50 10 L62 38 L50 46 L38 38 Z"
                fill={color}
            />

            {/* Plane 2 — Bottom-Left (Intelligence): extends left-down */}
            <path
                d="M16.5 72 L40 44 L50 50 L42 62 Z"
                fill={color}
            />

            {/* Plane 3 — Bottom-Right (Control): extends right-down */}
            <path
                d="M83.5 72 L58 62 L50 50 L60 44 Z"
                fill={color}
            />

            {/* Vertex node — small circle at convergence point */}
            <circle
                cx="50"
                cy="50"
                r="3.5"
                fill={color}
            />

            {/* Connecting edges — thin lines from outer vertices to center vertex */}
            <line x1="50" y1="14" x2="50" y2="46" stroke={color} strokeWidth="1.2" opacity="0.3" />
            <line x1="19" y1="70" x2="47" y2="49" stroke={color} strokeWidth="1.2" opacity="0.3" />
            <line x1="81" y1="70" x2="53" y2="49" stroke={color} strokeWidth="1.2" opacity="0.3" />
        </svg>
    );
}

/**
 * Compact version — solid silhouette only, no connecting lines.
 * For favicon, app icon, and very small sizes.
 */
export function VertexMark({
    size = 32,
    color = "currentColor",
    className = "",
}: LogoProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Xynoos Vertex mark"
        >
            {/* Unified convergence shape — three planes as a single path */}
            <path
                d={`
          M50 8
          L64 36
          L50 46
          L36 36
          Z
        `}
                fill={color}
            />
            <path
                d={`
          M14 74
          L38 42
          L50 50
          L40 64
          Z
        `}
                fill={color}
            />
            <path
                d={`
          M86 74
          L60 64
          L50 50
          L62 42
          Z
        `}
                fill={color}
            />
            <circle cx="50" cy="50" r="4" fill={color} />
        </svg>
    );
}

/**
 * Logo with wordmark — symbol + "Xynoos Vertex" text
 */
export function VertexLogoFull({
    size = 28,
    color = "currentColor",
    secondaryColor,
    className = "",
}: LogoProps & { secondaryColor?: string }) {
    const secondary = secondaryColor || color;

    return (
        <span className={`inline-flex items-center gap-2 ${className}`}>
            <VertexMark size={size} color={color} />
            <span
                style={{ color, fontSize: size * 0.54, fontWeight: 600, letterSpacing: "-0.02em" }}
            >
                Xynoos
                <span style={{ color: secondary, marginLeft: "0.12em" }}>Vertex</span>
            </span>
        </span>
    );
}
